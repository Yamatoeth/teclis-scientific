import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

// Contact form schema with all supported types
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
  type: z.enum(["general", "brochure", "quote", "demo", "support", "partnership", "product", "other"]).default("general"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || ""
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10)
const SMTP_USER = process.env.SMTP_USER || ""
const SMTP_PASS = process.env.SMTP_PASS || ""
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "contact@teclis-scientific.com"
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@teclis-scientific.com"

const isSmtpConfigured =
  SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_PORT > 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = contactSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // Type assertion: we know data.type is one of the 8 enum values
    type ContactType = "general" | "brochure" | "quote" | "demo" | "support" | "partnership" | "product" | "other"
    const data = validationResult.data as { type: ContactType; name: string; email: string; company?: string; phone?: string; subject: string; message: string }

    const subjectLine = `[Teclis Scientific] ${data.type === "brochure" ? "Brochure Request" : data.type === "quote" ? "Quote Request" : data.type === "demo" ? "Demo Request" : data.type === "product" ? "Product Inquiry" : data.type}: ${data.subject}`

    const emailBody = `
New ${data.type === "brochure" ? "Brochure" : data.type === "quote" ? "Quote" : data.type === "demo" ? "Demo" : data.type === "support" ? "Support" : data.type === "partnership" ? "Partnership" : data.type === "product" ? "Product" : "General"} Request
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
    `.trim()

    if (!isSmtpConfigured) {
      console.log("=== Teclis Scientific Contact Form Submission ===")
      console.log(`Date: ${new Date().toISOString()}`)
      console.log(`Type: ${data.type}`)
      console.log(`Name: ${data.name}`)
      console.log(`Email: ${data.email}`)
      console.log(`Company: ${data.company || "N/A"}`)
      console.log(`Phone: ${data.phone || "N/A"}`)
      console.log(`Subject: ${data.subject}`)
      console.log(`Message:\n${data.message}`)
      console.log("====================================================")
      console.log("NOTE: SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS")
      console.log("      to enable actual email delivery.\n")

      return NextResponse.json(
        {
          success: true,
          message: "Your request has been received. We'll get back to you soon.",
          simulated: true,
        },
        { status: 200 }
      )
    }

    // SMTP transport setup - using defaults for development
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })

    // Send email via SMTP
    await transporter.sendMail({
      from: `"Teclis Scientific" <${FROM_EMAIL}>`,
      to: CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: subjectLine,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>'),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Your request has been received. We'll get back to you soon.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    // Fallback: still log even if something went wrong
    try {
      const body = await request.json()
      const data = body as { type?: string; name?: string; email?: string; subject?: string; message?: string }

      console.log("=== Teclis Scientific Contact Form (FALLBACK) ===")
      console.log(`Date: ${new Date().toISOString()}`)
      console.log(`Type: ${data.type}`)
      console.log(`Name: ${data.name}`)
      console.log(`Email: ${data.email}`)
      console.log(`Subject: ${data.subject}`)
      console.log(`Message:\n${data.message}`)
      console.log("====================================================")
    } catch (logError) {
      console.error("Failed to log fallback:", logError)
    }

    if (error instanceof Error && error.message.includes("ETIMEDOUT")) {
      return NextResponse.json(
        {
          success: false,
          error: "Email delivery timed out. Please try again or contact us directly.",
          fallbackLogged: true,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or contact us directly.",
      },
      { status: 500 }
    )
  }
}
