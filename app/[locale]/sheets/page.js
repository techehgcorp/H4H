'use client';

import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Spin, Table } from 'antd';
import DashboardGraphs from '@/components/dashboard/DashboardGraphs'; // Importa o componente DashboardGraphs

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
 
const SheetsQuickstart = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('customers');
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState(0);


  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  const SHEET_ID = '1hCCNo_o8bk7IXva1KZt16FfTQX8m54FbQCxevjjNSt0';
  const RANGE = 'Sheet2!A1:Z100';

  // Mock Data for DashboardGraphs
//   const totalCustomers = 1234;
  const customersAddedData = [
    { period: 'Dia', count: 12 },
    { period: 'Semana', count: 90 },
    { period: 'Mês', count: 300 },
  ];
  const zipCodeDistributionData = [
    { zipcode: '12345', value: 40 },
    { zipcode: '67890', value: 30 },
    { zipcode: '54321', value: 20 },
    { zipcode: '98765', value: 10 },
  ];

  useEffect(() => {
    const scriptGapi = document.createElement('script');
    scriptGapi.src = 'https://apis.google.com/js/api.js';
    scriptGapi.async = true;
    scriptGapi.defer = true;
    scriptGapi.onload = () => {
      gapi.load('client', initializeGapiClient);
    };
    document.body.appendChild(scriptGapi);

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

      const storedToken = localStorage.getItem('google_token');
      if (storedToken) {
        gapi.client.setToken({ access_token: storedToken });
        setIsAuthenticated(true);
        listMajors();
      }
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

        const accessToken = resp.access_token;
        localStorage.setItem('google_token', accessToken);

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
    localStorage.removeItem('google_token');
    setIsAuthenticated(false);
    setData([]);
  };

  const listMajors = async () => {
    setLoading(true);
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
      const range = response.result;
      if (!range || !range.values || range.values.length === 0) {
        setData([]);
        return;
      }
  
      const [headers, ...rows] = range.values;
      const tableData = rows.map((row, index) => {
        const rowData = {};
        headers.forEach((header, i) => {
          rowData[header] = row[i] || '';
        });
        return { key: index, ...rowData };
      });
  
      setData(tableData);
  
      // Atualizar o total de clientes com o número de linhas na tabela
      setTotalCustomers(tableData.length);
    } catch (err) {
      console.error('Erro ao buscar dados:', err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const columns = data.length > 0
    ? Object.keys(data[0]).map((key) => ({
        title: (
          <span
            style={{
              display: 'inline-block',
              maxWidth: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={key} // Exibe o título completo ao passar o mouse
          >
            {key}
          </span>
        ),
        dataIndex: key,
        key,
        ellipsis: true, // Mantém o comportamento de reticências para os valores da coluna
      }))
    : [];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'customers':
        return (
          <div>
            {loading ? (
              <Spin size="large" />
            ) : (
              <Table
                dataSource={data}
                columns={columns}
                bordered
                pagination={{ pageSize: 15 }}
                rowClassName={() => 'custom-row'}
                scroll={{ x: 'max-content' }}
                size="middle"
              />
            )}
          </div>
        );
      case 'dashboard':
        return (
          <DashboardGraphs
            totalCustomers={totalCustomers}
            customersAddedData={customersAddedData}
            zipCodeDistributionData={zipCodeDistributionData}
          />
        );
      default:
        return <Title level={3}>Bem-vindo ao H4H Insurance Dashboard!</Title>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            color: 'white',
            lineHeight: '32px',
          }}
        >
          Control Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={(e) => setSelectedMenu(e.key)}
          items={[
            { key: 'customers', label: 'Customer List' },
            { key: 'dashboard', label: 'Dashboard' },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>H4H Insurance</div>
          <Button
            type="primary"
            onClick={isAuthenticated ? handleSignoutClick : handleAuthClick}
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Button>
        </Header>
        <Content style={{ margin: '20px', padding: '20px', background: '#fff' }}>
          {renderContent()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          H4H Insurance ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SheetsQuickstart;
