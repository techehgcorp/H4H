import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { date, time, method, email, username } = await req.json();

    if (!date || !time || !method) {
      return NextResponse.json(
        { message: 'Missing date, time, or appointment method' },
        { status: 400 }
      );
    }

    // Format date to MM/DD/YYYY
    const appointmentDate = new Date(date);
    const formattedDateUS = `${String(appointmentDate.getMonth() + 1).padStart(2, '0')}/${String(appointmentDate.getDate()).padStart(2, '0')}/${appointmentDate.getFullYear()}`;

    // Convert time to 12-hour format with AM/PM
    function formatTimeTo12Hour(timeStr) {
      const [hourStr, minuteStr] = timeStr.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = minuteStr;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${minute} ${ampm}`;
    }

    const formattedTime12h = formatTimeTo12Hour(time);

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define appointment method label
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

    // Email to the client
    const mailOptions = {
      from: '"H4H Insurance" <info@h4hinsurance.com>',
      to: email,
      subject: 'Appointment Confirmation',
      text: `Hello ${username},
Thank you so much for reaching out to us. Your appointment is confirmed for ${formattedDateUS} at ${formattedTime12h} via ${appointmentMethodText}.
Take good care,
Your H4H Partners`,
      html: `
      <p>Hello ${username},<br/>
      Thank you so much for reaching out to us. We’re happy to let you know that your appointment is confirmed for <strong>${formattedDateUS}</strong> at <strong>${formattedTime12h}</strong> via <strong>${appointmentMethodText}</strong>.<br/>
      It’s truly our privilege to serve you, and ensuring you feel fully supported every step of the way is our highest priority. We can’t wait to connect with you soon.<br/>
      In the meantime, feel free to text or call us anytime — and don’t forget to follow us on social media to stay up-to-date with the latest from our team.<br/><br/>
      Take good care,<br/>
      Your H4H Partners</p>
      <br/><br/>
      <img src="cid:h4hlogo"/>
      `,
      attachments: [
        {
          filename: 'logoemail.png',
          path: './public/images/logoemail.png',
          cid: 'h4hlogo',
        },
      ],
    };

    // Internal notification email to your team
    const internalMailOptions = {
      from: '"H4H Website Notification" <info@h4hinsurance.com>',
      to: [
        // 'gainam@h4hinsurance.com',
        // 'gaellem@h4hinsurance.com',
        // 'riccardo.joseph@h4hinsurance.com',
        'gabriel@ehgcorp.com'
      ],
      subject: 'A new appointment was scheduled on H4HInsurance website',
      html: `
        <p><strong>New Appointment Scheduled</strong></p>
        <p><strong>Name:</strong> ${username}<br/>
        <strong>Email:</strong> ${email}<br/>
        <strong>Date:</strong> ${formattedDateUS}<br/>
        <strong>Time:</strong> ${formattedTime12h}<br/>
        <strong>Method:</strong> ${appointmentMethodText}</p>
        <p>Please follow up with the client accordingly.</p>
      `,
    };

    // Send both emails
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
