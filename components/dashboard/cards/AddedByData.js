import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

const CustomersAddedChart = ({ data }) => {
  const config = {
    data,
    xField: 'period',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      period: { alias: 'Período' },
      count: { alias: 'Clientes Adicionados' },
    },
  };

  return (
    <Card title="Clientes Adicionados">
      <Column {...config} />
    </Card>
  );
};

export default CustomersAddedChart;
