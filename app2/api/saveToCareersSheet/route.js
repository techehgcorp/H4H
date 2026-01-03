import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import moment from 'moment';

export async function POST(req) {
  try {
    const submittedAt = moment.utc(new Date()).local().format('MM-DD-YYYY HH:mm:ss Z');

    // Detect content-type and parse accordingly (we expect multipart/form-data from the form)
    const contentType = req.headers.get('content-type') || '';
    let form;
    let data = {};

    if (contentType.includes('multipart/form-data')) {
      form = await req.formData();

      const t = (k) => (form.get(k) ?? '').toString().trim();
      const fname = (k) => {
        const f = form.get(k);
        return f && typeof f === 'object' && 'name' in f ? (f.name || '') : '';
      };

      data = {
        jobOpening: t('jobOpening'),
        firstName: t('firstName'),
        lastName: t('lastName'),
        email: t('email'),
        phone: t('phone'),
        address1: t('address1'),
        address2: t('address2'),
        city: t('city'),
        state: t('state'),
        zip: t('zip'),
        ssn: t('ssn'),
        npn: t('npn'),
        dob: t('dob'), // YYYY-MM-DD
        frontPhotoIdName: fname('frontPhotoId'),
        backPhotoIdName: fname('backPhotoId'),
        education: form.getAll('education').map((v) => v.toString()), // multiple checkboxes
        niprFileName: fname('nipr'),
        resumeFileName: fname('resume'),
        languages: t('languages'),
        recentEmployment: t('recentEmployment'),
        employmentStatus: t('employmentStatus'),
        felony: t('felony') || 'no',
        availableDate: t('availableDate'), // YYYY-MM-DD
        referral: t('referral'),
      };
    } else {
      // JSON fallback (caso chame via fetch com body JSON)
      data = await req.json();
      if (!Array.isArray(data.education)) {
        data.education = data.education ? [data.education] : [];
      }
    }

    // --- Google Auth (seguindo seu padrão com NEXT_PUBLIC_*) ---
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // --- H4H Spreadsheet ---
    const spreadsheetId = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
    // Aba esperada: "Careers". Se a sua aba tiver outro nome, ajuste aqui.
    const range = 'Careers!A:Z';

    // Linha na mesma ordem do header recomendado:
    // Submitted At | Job Opening | First Name | Last Name | Full Name | Email | Phone | Address Line 1 | Address Line 2 | City | State | Zip | SSN | NPN | DOB | Front Photo ID | Back Photo ID | Education | NIPR Report | Résumé | Languages | Recent Employment | Employment Status | Felony | Available Date | Referral
    const values = [[
      submittedAt,
      data.jobOpening || '',
      data.firstName || '',
      data.lastName || '',
      `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      data.email || '',
      data.phone || '',
      data.address1 || '',
      data.address2 || '',
      data.city || '',
      data.state || '',
      data.zip || '',
      data.ssn || '',
      data.npn || '',
      data.dob || '',
      data.frontPhotoIdName || '',
      data.backPhotoIdName || '',
      (Array.isArray(data.education) ? data.education.join(', ') : (data.education || '')),
      data.niprFileName || '',
      data.resumeFileName || '',
      data.languages || '',
      data.recentEmployment || '',
      data.employmentStatus || '',
      data.felony || 'no',
      data.availableDate || '',
      data.referral || '',
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });

    return NextResponse.json({ message: 'Careers (H4H) saved successfully', status: 200 });
  } catch (error) {
    console.error('saveToCareersSheet (H4H) error:', error);
    return NextResponse.json({ error: error.message || String(error), status: 500 }, { status: 500 });
  }
}
