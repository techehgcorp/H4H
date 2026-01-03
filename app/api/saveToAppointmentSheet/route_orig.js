import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req) {
  try {
    const body = await req.json();
    const dateTime = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');

    // Autenticação com Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Dados a serem gravados
    const spreadsheetId = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
    const range = 'Appointment!A:H'; // Defina o range baseado na sua estrutura da aba

    const values = [[
      body?.username || '',
      body?.email || '',
      body?.date || '',
      body?.time || '',
      body?.method || '',
      body?.contactMethod || '',
      body?.suggestions || '',
      dateTime
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values,
      },
    });

    return NextResponse.json({ message: 'Appointment saved successfully', status: 200 });
  } catch (error) {
    console.error('Google Sheets error:', error);
    return NextResponse.json({ error: error.message || 'Unknown error', status: 500 }, { status: 500 });
  }
}
