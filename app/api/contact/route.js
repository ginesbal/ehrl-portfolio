import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, company, subject, message } = body

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Improved email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!emailRegex.test(email) || email.length > 254) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        // Basic input sanitization
        const sanitizedName = name.trim().slice(0, 100)
        const sanitizedMessage = message.trim().slice(0, 5000)

        if (sanitizedName.length < 2 || sanitizedMessage.length < 10) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters and message at least 10 characters' },
                { status: 400 }
            )
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${sanitizedName} (${email})</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                <p><strong>Subject:</strong> ${subject}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${sanitizedMessage.replace(/\n/g, '<br />').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            `,
        })

        if (error) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
