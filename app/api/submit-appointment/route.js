import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { date, time, method, email } = await req.json();

    if (!date || !time || !method) {
      return NextResponse.json(
        { message: 'Missing date, time, or appointment method' },
        { status: 400 }
      );
    }

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or another email provider
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER, // Your email
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Your email password (or app password)
      },
    });

    console.log(transporter, 'transporter');

    // Email content based on the selected appointment method
    let appointmentMethodText;
    switch (method) {
      case 'face-to-face':
        appointmentMethodText = 'Face to Face Office Meeting';
        break;
      case 'phone':
        appointmentMethodText = 'Phone Call';
        break;
      case 'virtual':
        appointmentMethodText = 'Virtual Meeting via Google Meet';
        break;
      default:
        appointmentMethodText = 'Unknown';
    }

    // Email content
    const mailOptions = {
      from: '"Your Company" <your-email@example.com>',
      to: email, // Send email to the customer
      subject: 'Appointment Confirmation',
      text: `Your appointment is scheduled for ${date} at ${time} via ${appointmentMethodText}.`,
      html: `<p>Your appointment is scheduled for <strong>${date}</strong> at <strong>${time}</strong> via <strong>${appointmentMethodText}</strong>.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: 'Appointment confirmed and email sent' },
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
