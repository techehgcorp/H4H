import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { firstName, email, locale } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Mensagens por idioma
    const messages = {
      en: {
        subject: 'Thank you for contacting H4H!',
        greeting: `Hello <strong>${firstName}</strong>,`,
        body: `Thank you for opting in to receive updates from us.<br>One of our agents will be contacting you soon.`,
        closing: `<b><i>Best regards,</i></b><br>H4H Insurance`,
      },
      es: {
        subject: '¡Gracias por contactar a H4H!',
        greeting: `Hola <strong>${firstName}</strong>,`,
        body: `Gracias por suscribirte para recibir actualizaciones de nuestra parte.<br>Uno de nuestros agentes se comunicará contigo pronto.`,
        closing: `<b><i>Saludos cordiales,</i></b><br>H4H Insurance`,
      },
      ht: {
        subject: 'Mèsi paske ou kontakte H4H!',
        greeting: `Bonjou <strong>${firstName}</strong>,`,
        body: `Mèsi paske ou abònman pou resevwa nouvèl nan men nou.<br>Youn nan ajan nou yo ap kontakte w byento.`,
        closing: `<b><i>Meyè salitasyon,</i></b><br>H4H Insurance`,
      },
    };

    const lang = messages[locale] ? locale : 'en'; // fallback to English

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const customerMailOptions = {
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: messages[lang].subject,
      html: `
        <p>${messages[lang].greeting}</p>
        <p>${messages[lang].body}</p>
        <p>${messages[lang].closing}</p>
        <p>(786) 397-7167 or (844) 544-0663</p>
      `,
    };

    const internalNotificationOptions = {
      from: '"H4H Insurance Website" <info@h4hinsurance.com>',
      to: [
        'gainam@h4hinsurance.com',
        'gaellem@h4hinsurance.com',
        'riccardo.joseph@h4hinsurance.com',
        // 'gabriel@ehgcorp.com'
      ],
      subject: 'A new customer was registered on H4HInsurance website',
      html: `
        <p><strong>A customer has subscribed on H4HInsurance.</strong></p>
        <p>Name: ${firstName}<br>Email: ${email}</p>
        <p>An agent should contact the customer shortly.</p>
      `,
    };

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
