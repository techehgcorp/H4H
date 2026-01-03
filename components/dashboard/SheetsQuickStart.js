'use client';

import { useState, useEffect } from 'react';

const SheetsQuickstart = () => {
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState('Carregando...');
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

  useEffect(() => {
    // Carrega o script do gapi
    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/api.js';
    scriptGapi.async = true;
    scriptGapi.defer = true;
    scriptGapi.onload = () => {
      gapi.load('client', initializeGapiClient);
    };
    document.body.appendChild(scriptGapi);

    // Carrega o script do GIS
    const scriptGis = document.createElement('script');
    scriptGis.src = 'https://accounts.google.com/gsi/client';
    scriptGis.async = true;
    scriptGis.defer = true;
    scriptGis.onload = gisLoaded;
    document.body.appendChild(scriptGis);

    return () => {
      document.body.removeChild(scriptGapi);
      document.body.removeChild(scriptGis);
    };
  }, []);

  const initializeGapiClient = async () => {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      setGapiInited(true);
    } catch (error) {
      console.error('Erro ao inicializar o GAPI:', error);
    }
  };

  const gisLoaded = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp.error) {
          console.error('Erro ao autenticar:', resp.error);
          return;
        }
        setIsAuthenticated(true);
        listMajors();
      },
    });
    setTokenClient(client);
    setGisInited(true);
  };

  const handleAuthClick = () => {
    if (!tokenClient) return;

    tokenClient.requestAccessToken({ prompt: 'consent' });
  };

  const handleSignoutClick = () => {
    gapi.client.setToken(null);
    setIsAuthenticated(false);
    setData('Deslogado.');
  };

  const listMajors = async () => {
    const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
    const RANGE = 'Class Data!A2:E';

    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
      const range = response.result;
      if (!range || !range.values || range.values.length === 0) {
        setData('No values found.');
        return;
      }
      const output = range.values.reduce(
        (str, row) => `${str}${row[0]}, ${row[4]}\n`,
        'Name, Major:\n'
      );
      setData(output);
    } catch (err) {
      console.error('Erro ao buscar dados:', err.message);
    }
  };

  return (
    <div>
      <h1>Sheets API Quickstart</h1>
      {!isAuthenticated ? (
        <button onClick={handleAuthClick}>Authorize</button>
      ) : (
        <button onClick={handleSignoutClick}>Sign Out</button>
      )}
      <pre style={{ whiteSpace: 'pre-wrap' }}>{data}</pre>
    </div>
  );
};

export default SheetsQuickstart;
