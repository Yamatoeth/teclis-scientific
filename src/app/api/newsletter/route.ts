import { NextRequest, NextResponse } from 'next/server';

// API Route to handle newsletter subscriptions via Mailchimp
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Mailchimp Configuration from Environment Variables

    const dc = process.env.MAILCHIMP_DC;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const apiKey = process.env.MAILCHIMP_API_KEY;

    // Mailchimp uses Basic Auth: API key as username, any string as password
    const authHeader = 'Basic ' + Buffer.from(`${apiKey}:anystring`).toString('base64');

    const providerRes = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed'
      })
    });

    if (!providerRes.ok) {
      const err = await providerRes.text();
      return NextResponse.json({ error: err }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}