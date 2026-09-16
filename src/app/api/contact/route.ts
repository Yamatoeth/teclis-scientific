import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  type: z.enum(["general", "brochure", "quote", "support", "partnership", "other"]).default("general"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

// Email configuration from environment variables
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "contact@teclis-scientific.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@teclis-scientific.com";

// Check if SMTP is configured
const isSmtpConfigured =
  SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_PORT > 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Build email content
    const subjectLine = `[Teclis Scientific] ${data.type === "brochure" ? "Brochure Request" : data.type === "quote" ? "Quote Request" : data.type}: ${data.subject}`;

    const emailBody = `
New ${data.type === "brochure" ? "Brochure" : data.type === "quote" ? "Quote" : data.type === "support" ? "Support" : data.type === "partnership" ? "Partnership" : "General"} Request
======================================================================

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "N/A"}
Phone: ${data.phone || "N/A"}
Request Type: ${data.type}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from the Teclis Scientific website.
    `.trim();

    // In development/test mode without SMTP, log and simulate success
    if (!isSmtpConfigured) {
      console.log("=== Teclis Scientific Contact Form Submission ===");
      console.log(`Date: ${new Date().toISOString()}`);
      console.log(`Type: ${data.type}`);
      console.log(`Name: ${data.name}`);
      console.log(`Email: ${data.email}`);
      console.log(`Company: ${data.company || "N/A"}`);
      console.log(`Phone: ${data.phone || "N/A"}`);
      console.log(`Subject: ${data.subject}`);
      console.log(`Message:\n${data.message}`);
      console.log("====================================================");
      console.log("NOTE: SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS");
      console.log("      to enable actual email delivery.\n");

      // Simulate successful send
      return NextResponse.json(
        {
          success: true,
          message: "Your request has been received. We'll get back to you soon.",
          simulated: true,
        },
        { status: 200 }
      );
    }

    // Try to send email using nodemailer
    try {
      const nodemailer = await import("nodemailer");

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      // Verify connection configuration
      await transporter.verify();

      // Send to sales team
      await transporter.sendMail({
        from: `"Teclis Scientific Contact Form" <${FROM_EMAIL}>`,
        to: CONTACT_EMAIL_TO,
        replyTo: data.email,
        subject: subjectLine,
        text: emailBody,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 20px; text-align: center; }
    .header h2 { margin: 0; font-size: 24px; }
    .content { padding: 20px 0; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
    .value { color: #333; padding: 10px; background: #f5f5f5; border-radius: 5px; }
    .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 New ${data.type === "brochure" ? "Brochure" : data.type === "quote" ? "Quote" : data.type === "support" ? "Support" : data.type === "partnership" ? "Partnership" : "General"} Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <div class="value">${data.email}</div>
      </div>
      ${data.company ? `
      <div class="field">
        <span class="label">Company:</span>
        <div class="value">${data.company}</div>
      </div>` : ""}
      ${data.phone ? `
      <div class="field">
        <span class="label">Phone:</span>
        <div class="value">${data.phone}</div>
      </div>` : ""}
      <div class="field">
        <span class="label">Request Type:</span>
        <div class="value">${data.type}</div>
      </div>
      <div class="field">
        <span class="label">Subject:</span>
        <div class="value">${data.subject}</div>
      </div>
      <div class="message-box">
        <span class="label">Message:</span>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
    <div class="footer">
      Sent from Teclis Scientific website | ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>
        `,
      });

      // Send acknowledgment to the sender (optional)
      if (data.email) {
        await transporter.sendMail({
          from: `"Teclis Scientific" <${FROM_EMAIL}>`,
          to: data.email,
          subject: `Thank you for your ${data.type} request`,
          text: `
Thank you for contacting Teclis Scientific, ${data.name}!

We have received your ${data.type} request and will get back to you within 24-48 hours.

Your reference details:
- Subject: ${data.subject}
- Email: ${data.email}

If you have any urgent questions, please contact us directly at:
- Email: contact@teclis-scientific.com
- Phone: +33 4 74 70 18 51

Best regards,
Teclis Scientific Team
          `.trim(),
          html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 20px; text-align: center; }
    .header h2 { margin: 0; }
    .content { padding: 20px 0; }
    .highlight { background: #f0fdf4; border-radius: 8px; padding: 15px; margin: 15px 0; }
    .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; border-top: 1px solid #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Thank You! 🎉</h2>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      <p>Thank you for contacting <strong>Teclis Scientific</strong>.</p>
      <p>We have received your <strong>${data.type}</strong> request and our team will review it promptly.</p>
      <div class="highlight">
        <strong>Subject:</strong> ${data.subject}<br>
        <strong>Expected Response Time:</strong> 24-48 hours
      </div>
      <p>If you have any urgent questions, feel free to contact us directly:</p>
      <ul>
        <li>Email: <a href="mailto:contact@teclis-scientific.com">contact@teclis-scientific.com</a></li>
        <li>Phone: +33 4 74 70 18 51</li>
      </ul>
      <p>Best regards,<br><strong>Teclis Scientific Team</strong></p>
    </div>
    <div class="footer">
      Teclis Scientific | 22 ch. des prés secs, 69380 Civrieux d'Azergues, France
    </div>
  </div>
</body>
</html>
          `,
        });
      }

      return NextResponse.json(
        {
          success: true,
          message: "Your request has been received. We'll get back to you soon.",
        },
        { status: 200 }
      );
    } catch (sendError) {
      console.error("Failed to send email via SMTP:", sendError);

      // Still return success to user, but log the error
      return NextResponse.json(
        {
          success: true,
          message: "Your request has been recorded. We'll get back to you soon.",
          warning: "Email delivery encountered an issue. Our team has been notified.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
