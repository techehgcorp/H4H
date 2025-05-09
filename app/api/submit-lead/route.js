import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse JSON do corpo da requisição
    const { firstName, email } = await req.json();

    // Validação básica
    if (!firstName || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // Porta SSL para Gmail
      secure: true, // Usa SSL
      auth: {
        user: process.env.EMAIL_USER, // Usuário do e-mail (não exposto ao cliente)
        pass: process.env.EMAIL_PASS, // Senha do e-mail ou senha de app
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: '"H4H Insurance" <info@h4hinsurance.com>', // Remetente
      to: email, // Destinatário (e-mail do cliente)
      subject: 'Thank you for contacting H4H!',
      html: `
        <p>Hello <strong>${firstName}</strong>,</p>
        <p>Thank you for opting in to receive updates from us.<br>
        One of our agents will be contacting you soon.</p>
        <p><b><i>Best regards,</i></b><br>H4H Insurance</p>
        <p>(786) 397-7167 or (844) 544-0663</p>
      `,
    };

    // Envio do e-mail
    await transporter.sendMail(mailOptions);

    // Retorno de sucesso
    return NextResponse.json(
      { message: 'Opt-in confirmed, email sent' },
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
