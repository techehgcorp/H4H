// src/lib/googleSheets.js
// Server-only access to the H4H_Form spreadsheet.
// Never import this from a "use client" component: it uses the Google
// service-account key.
import { google } from "googleapis";

// Same spreadsheet the existing /api/saveTo*Sheet routes write to.
const DEFAULT_SPREADSHEET_ID = "1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0";
const REQUEST_TIMEOUT_MS = 8000;

const SCOPES = {
  read: "https://www.googleapis.com/auth/spreadsheets.readonly",
  write: "https://www.googleapis.com/auth/spreadsheets",
};

export function getSpreadsheetId() {
  return process.env.H4H_SPREADSHEET_ID || DEFAULT_SPREADSHEET_ID;
}

function getCredentials() {
  // GOOGLE_* is the preferred (private) name. The NEXT_PUBLIC_* fallback keeps
  // today's .env working until the variables are renamed.
  const clientEmail =
    process.env.GOOGLE_CLIENT_EMAIL || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const privateKey = (
    process.env.GOOGLE_PRIVATE_KEY || process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || ""
  ).replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials are not configured.");
  }

  return { client_email: clientEmail, private_key: privateKey };
}

const clients = new Map();

function getSheetsClient(access) {
  if (!clients.has(access)) {
    const auth = new google.auth.GoogleAuth({
      credentials: getCredentials(),
      scopes: [SCOPES[access]],
    });
    clients.set(access, google.sheets({ version: "v4", auth }));
  }

  return clients.get(access);
}

// Returns the cell values of a range as an array of rows, e.g. "Agents!A:BZ".
export async function readSheetRange(range) {
  const sheets = getSheetsClient("read");
  const response = await sheets.spreadsheets.values.get(
    { spreadsheetId: getSpreadsheetId(), range },
    { timeout: REQUEST_TIMEOUT_MS }
  );

  return response.data.values || [];
}
