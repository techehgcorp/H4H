import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/charts';

const ZipCodeDistributionChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'zipcode',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Card title="Distribuição por ZIP Code">
      <Pie {...config} />
    </Card>
  );
};

export default ZipCodeDistributionChart;
