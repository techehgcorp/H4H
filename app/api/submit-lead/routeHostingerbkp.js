import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { firstName, email } = await req.json(); // Capture form data

  if (!firstName || !email) {
    return NextResponse.json(
      { message: 'Name and email are required' },
      { status: 400 }
    );
  }

  // Set up Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or another email provider
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Your email password or app password
    },
  });

  // Email content
  const mailOptions = {
    from: '"H4H Insurance" <info@h4hinsurance.com>',
    to: email, // Send email to the customer
    subject: 'Thank you for contacting H4H!',
    // text: `Hello ${firstName},\n\nThank you for opting in to receive updates from us.\n\nBest regards,\nYour Company`,
    html: `<p>Hello <strong>${firstName}</strong>,</p><p>Thank you for opting in to receive updates from us.<br>One of our agents will be contacting you soon.</p><b><i>Best regards,</i><br>H4H Insurance</b><p>1.844.544.0663</p>`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: 'Opt-in confirmed, email sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
