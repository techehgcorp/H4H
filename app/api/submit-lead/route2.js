import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { firstName, email } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-mail para o cliente
    const customerMailOptions = {
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: 'Thank you for contacting H4H!',
      html: `
        <p>Hello <strong>${firstName}</strong>,</p>
        <p>Thank you for opting in to receive updates from us.<br>
        One of our agents will be contacting you soon.</p>
        <p><b><i>Best regards,</i></b><br>H4H Insurance</p>
        <p>(786) 397-7167 or (844) 544-0663</p>
      `,
    };

    // E-mail para os atendentes internos
    const internalNotificationOptions = {
      from: '"H4H Insurance Website" <info@h4hinsurance.com>',
      to: [
        'gainam@h4hinsurance.com',
        'gaellem@h4hinsurance.com',
        'riccardo.joseph@h4hinsurance.com',

      ],
      subject: 'A new customer was registered on H4HInsurance website',
      html: `
        <p><strong>A customer has subscribed on H4HInsurance.</strong></p>
        <p>Name: ${firstName}<br>Email: ${email}</p>
        <p>An agent should contact the customer shortly.</p>
      `,
    };

    // Envia os e-mails
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(internalNotificationOptions);

    return NextResponse.json(
      { message: 'Opt-in confirmed, emails sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send confirmation email', error: error.message },
      { status: 500 }
    );
  }
}
