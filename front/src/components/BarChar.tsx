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
  Cell,
} from 'recharts';
import { COLORS } from '../shared/helpers';

interface Props {
  data: any;
  title: string;
  dataKeyX: string;
  dataKeyBar: string;
  currentBucket?: string | undefined;
}

const BarChartWrapper = ({
  data,
  dataKeyX,
  dataKeyBar,
  title,
  currentBucket,
}: Props) => {
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
        style={{
          fontFamily: 'Arial',
        }}
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
        <CartesianGrid strokeDasharray="4 10" />
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKeyBar} fill="#326771">
          {data &&
            data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={currentBucket === entry.name ? COLORS[1] : COLORS[3]}
              />
            ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarChartWrapper;
