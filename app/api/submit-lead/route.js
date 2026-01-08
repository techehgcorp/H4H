import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const runtime = 'nodejs';

// ===== META CAPI HELPERS =====
function sha256(value) {
  return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');
}

function parseCookies(cookieHeader = '') {
  const out = {};
  cookieHeader.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    if (!k) return;
    out[k] = decodeURIComponent(v.join('=') || '');
  });
  return out;
}

async function sendMetaCapiEvent({ req, eventName, email, eventId }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('META CAPI: META_PIXEL_ID ou META_CAPI_TOKEN não configurados.');
    return;
  }

  const headers = req.headers;
  const cookieHeader = headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);

  const fbp = cookies?._fbp;
  const fbc = cookies?._fbc;

  // IP real pode vir por proxy/CDN
  const clientIp =
    (headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    undefined;

  const userAgent = headers.get('user-agent') || undefined;

  // URL de origem (melhor esforço)
  const eventSourceUrl = headers.get('referer') || 'https://h4hinsurance.com/';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventSourceUrl,
        event_id: eventId,
        user_data: {
          em: email ? [sha256(email)] : undefined,
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp,
          fbc,
        },
      },
    ],
    // Opcional: aparece em Events Manager > Test Events
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };

  // Limpa chaves undefined pra Meta não reclamar
  const clean = JSON.parse(JSON.stringify(payload));

  const url = `https://graph.facebook.com/v24.0/${pixelId}/events?access_token=${accessToken}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(clean),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('META CAPI erro:', json);
  } else {
    console.log('META CAPI ok:', json);
  }
}

// ===== ROUTE =====
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

    const lang = messages[locale] ? locale : 'en';

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

    // ===== META CAPI: dispara Lead somente após sucesso =====
    const eventId = crypto.randomUUID();
    await sendMetaCapiEvent({
      req,
      eventName: 'Lead',
      email,
      eventId,
    });

    return NextResponse.json(
      { message: 'Opt-in confirmed, emails sent', meta_event_id: eventId },
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
