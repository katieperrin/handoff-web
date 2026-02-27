export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'The Handoffs <noreply@thehandoffs.com>',
      to: ['support@thehandoffs.com'],
      reply_to: email.trim(),
      subject: subject?.trim() ? `Contact: ${subject.trim()}` : `New message from ${name.trim()}`,
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        ${subject?.trim() ? `<p><strong>Subject:</strong> ${subject.trim()}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap">${message.trim()}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return Response.json({ error: err.message || 'Failed to send message.' }, { status: 500 });
  }

  return Response.json({ success: true });
}
