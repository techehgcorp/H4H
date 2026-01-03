import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req) {
  try {
    const body = await req.json();
    const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
    const range = 'Referal!A:H'; // Ajuste conforme os dados do seu form

    // Supondo que você recebe: friendName, friendPhone, friendEmail, yourName, yourPhone, yourEmail
    const values = [[
      body?.friendName,
      body?.friendEmail,
      body?.yourName,
      body?.yourEmail,
      dateTime
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });

    return NextResponse.json({ message: 'Referral saved successfully', status: 200 });
  } catch (error) {
    console.error('Error saving referral:', error);
    return NextResponse.json({ error: 'Failed to save referral', status: 500 }, { status: 500 });
  }
}
