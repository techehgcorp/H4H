
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { useTranslation } from 'react-i18next';


export async function POST(req) {
  const {t} = useTranslation();
  try {
    const { date, time, method, email, username } = await req.json();

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
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password (or app password)
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
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: t('email.subject'),
      text: t('email.text', {
        username,
        date,
        time,
        method: appointmentMethodText
      }),
      html: t('email.html', {
        username,
        date,
        time,
        method: appointmentMethodText
      }),
      attachments: [
        {
          filename: 'logoemail.png',
          path: './public/images/logoemail.png',
          cid: 'h4hlogo'
        }
      ]
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
