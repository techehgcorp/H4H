'use client';

import { useEffect, useState } from 'react';
import { Button, Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  useEffect(() => {
    const scriptGis = document.createElement('script');
    scriptGis.src = 'https://accounts.google.com/gsi/client';
    scriptGis.async = true;
    scriptGis.defer = true;
    scriptGis.onload = () => initializeGoogleOAuth();
    document.body.appendChild(scriptGis);

    return () => {
      document.body.removeChild(scriptGis);
    };
  }, []);

  const initializeGoogleOAuth = () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleGoogleCallback,
    });
  };

  const handleGoogleCallback = (response) => {
    if (response.credential) {
      // Salvar token para uso posterior
      localStorage.setItem('google_token', response.credential);
      setIsAuthenticated(true);
    }
  };

  const handleLogin = () => {
    window.google.accounts.id.prompt();
  };

  if (isAuthenticated) {
    window.location.href = '/dashboard'; // Redireciona para a dashboard
    return null;
  }

  return (
    <Layout style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ textAlign: 'center' }}>
        <Title level={2}>Bem-vindo à H4HInsurance</Title>
        <Button type="primary" onClick={handleLogin}>
          Login com Google
        </Button>
      </Content>
    </Layout>
  );
};

export default LoginPage;
