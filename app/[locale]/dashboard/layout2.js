'use client'

import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('customer-list');
  const userName = 'Usuário Autenticado'; // Substitua pelo nome real do usuário se disponível.

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    window.location.href = '/dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
        <Title level={4} style={{ margin: 0, color: '#fff' }}>
          H4HInsurance
        </Title>
        <a style={{ color: '#fff', cursor: 'pointer' }} onClick={handleLogout}>
          Sign Out
        </a>
      </Header>

      {/* Sidebar */}
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['customer-list']}
            onClick={handleMenuClick}
            items={[
              { key: 'customer-list', label: 'Customer List' },
              { key: 'management', label: 'Management' },
            ]}
          />
        </Sider>

        {/* Content Area */}
        <Content style={{ padding: '16px' }}>
          {selectedMenu === 'customer-list' && <div>Customer List - Integração com Google Sheets</div>}
          {selectedMenu === 'management' && <div>Usuário Logado: {userName}</div>}
        </Content>
      </Layout>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>H4HInsurance</Footer>
    </Layout>
  );
};

export default DashboardLayout;
