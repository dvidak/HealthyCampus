import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: any;
  title: string;
}

const BarChartWrapper = ({ data, title }: Props) => {
  const isMobile = useMedia('(max-width: 767px)');
  const [width, setWidth] = useState(500);

  useEffect(() => {
    if (isMobile) {
      setWidth(350);
    } else {
      setWidth(500);
    }
  }, [isMobile]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
      }}
    >
      <Typography color="primary" variant="h3" align="center">
        {title}
      </Typography>
      <BarChart
        width={width}
        height={300}
        data={data}
        margin={{
          top: 70,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#326771" />
      </BarChart>
    </div>
  );
};

export default BarChartWrapper;
