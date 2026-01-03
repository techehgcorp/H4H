import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { date, time, method, email, username, locale } = await req.json();

    if (!date || !time || !method) {
      return NextResponse.json(
        { message: 'Missing date, time, or appointment method' },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);
    const formattedDateUS = `${String(appointmentDate.getMonth() + 1).padStart(2, '0')}/${String(appointmentDate.getDate()).padStart(2, '0')}/${appointmentDate.getFullYear()}`;

    function formatTimeTo12Hour(timeStr) {
      const [hourStr, minuteStr] = timeStr.split(':');
      let hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${minuteStr} ${ampm}`;
    }

    const formattedTime12h = formatTimeTo12Hour(time);

    // Define appointment method label
    const appointmentMethodText = {
      'face-to-face': {
        en: 'Face to Face Office Meeting',
        es: 'Reunión presencial en la oficina',
        ht: 'Randevou an pèsòn nan biwo a',
      },
      phone: {
        en: 'Phone Call',
        es: 'Llamada telefónica',
        ht: 'Apèl telefòn',
      },
      virtual: {
        en: 'Virtual Meeting via Google Meet',
        es: 'Reunión virtual por Google Meet',
        ht: 'Randevou vityèl sou Google Meet',
      },
    };

    const lang = ['en', 'es', 'ht'].includes(locale) ? locale : 'en';

    const messages = {
      en: {
        subject: 'Appointment Confirmation',
        html: `
          <p>Hello ${username},<br/>
          Thank you so much for reaching out to us. We’re happy to let you know that your appointment is confirmed for <strong>${formattedDateUS}</strong> at <strong>${formattedTime12h}</strong> via <strong>${appointmentMethodText[method][lang]}</strong>.<br/>
          It’s truly our privilege to serve you, and ensuring you feel fully supported every step of the way is our highest priority. We can’t wait to connect with you soon.<br/>
          In the meantime, feel free to text or call us anytime — and don’t forget to follow us on social media to stay up-to-date with the latest from our team.<br/><br/>
          Take good care,<br/>
          Your H4H Partners</p>
          <br/><br/>
          <img src="cid:h4hlogo"/>
        `,
      },
      es: {
        subject: 'Confirmación de Cita',
        html: `
          <p>Hola ${username},<br/>
          Muchas gracias por comunicarse con nosotros. Nos complace informarle que su cita está confirmada para el <strong>${formattedDateUS}</strong> a las <strong>${formattedTime12h}</strong> vía <strong>${appointmentMethodText[method][lang]}</strong>.<br/>
          Es realmente un privilegio para nosotros servirle, y asegurarnos de que se sienta completamente apoyado en cada paso del camino es nuestra máxima prioridad. Estamos ansiosos por conectarnos con usted pronto.<br/>
          Mientras tanto, no dude en enviarnos un mensaje de texto o llamarnos en cualquier momento, y no olvide seguirnos en las redes sociales para estar al día con las novedades de nuestro equipo.<br/><br/>
          Cuídese mucho,<br/>
          Sus socios de H4H</p>
          <br/><br/>
          <img src="cid:h4hlogo"/>
        `,
      },
      ht: {
        subject: 'Konfimasyon Randevou',
        html: `
          <p>Bonjou ${username},<br/>
          Mèsi anpil dèske ou kontakte nou. Nou kontan fè ou konnen ke randevou ou konfime pou <strong>${formattedDateUS}</strong> a <strong>${formattedTime12h}</strong> atravè <strong>${appointmentMethodText[method][lang]}</strong>.<br/>
          Sa se yon privilèj pou nou sèvi ou, e priyorite nou se asire ke ou santi ou sipòte chak etap sou wout ou. Nou pa ka tann pou nou konekte avèk ou talè konsa.<br/>
          Pandan tan sa a, ou ka rele oswa voye mesaj nenpòt kilè — epi pa bliye swiv nou sou rezo sosyal pou w rete enfòme sou dènye nouvèl ekip nou an.<br/><br/>
          Pran swen tèt ou,<br/>
          Patnè ou yo nan H4H</p>
          <br/><br/>
          <img src="cid:h4hlogo"/>
        `,
      },
    };

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: messages[lang].subject,
      html: messages[lang].html,
      attachments: [
        {
          filename: 'logoemail.png',
          path: './public/images/logoemail.png',
          cid: 'h4hlogo',
        },
      ],
    };

    const internalMailOptions = {
      from: '"H4H Website Notification" <info@h4hinsurance.com>',
      to: [        
          'gainam@h4hinsurance.com',
          'gaellem@h4hinsurance.com',
          'riccardo.joseph@h4hinsurance.com',
      // 'gabriel@ehgcorp.com'
          ],
      subject: 'A new appointment was scheduled on H4HInsurance website',
      html: `
        <p><strong>New Appointment Scheduled</strong></p>
        <p><strong>Name:</strong> ${username}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Date:</strong> ${formattedDateUS}<br/>
        <strong>Time:</strong> ${formattedTime12h}<br/>
        <strong>Method:</strong> ${appointmentMethodText[method][lang]}</p>
        <p>Please follow up with the client accordingly.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(internalMailOptions);

    return NextResponse.json(
      { message: 'Appointment confirmed and emails sent' },
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
