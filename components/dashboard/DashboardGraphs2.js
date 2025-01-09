import React from 'react';
import { Card, Row, Col } from 'antd';
import { Column, Pie } from '@ant-design/charts';

const DashboardGraphs = ({ totalCustomers, customersAddedData, zipCodeDistributionData }) => {
  // Configuração do gráfico de Clientes Adicionados
  const configCustomersAddedChart = {
    data: customersAddedData,
    xField: 'period',
    yField: 'count',
    seriesField: 'period',
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        opacity: 0.6,
      },
    },
    meta: {
      period: {
        alias: 'Período',
      },
      count: {
        alias: 'Clientes Adicionados',
      },
    },
  };

  // Configuração do gráfico de Distribuição por CEP
  const configZipCodeDistribution = {
    data: zipCodeDistributionData,
    angleField: 'value',
    colorField: 'zipcode',
    radius: 0.8,
    label: {
      type: 'spider',
      content: '{percentage}%',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card title="Total de Clientes" style={{ textAlign: 'center' }}>
          <h1>{totalCustomers}</h1>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Clientes Adicionados">
          <Column {...configCustomersAddedChart} />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Distribuição por CEP">
          <Pie {...configZipCodeDistribution} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardGraphs;
