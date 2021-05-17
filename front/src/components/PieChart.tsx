import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { Cell, Pie, PieChart, Sector } from 'recharts';

interface Props {
  data: any;
  title: string;
}

const COLORS = ['#2C8C99', '#42D9C8', '#28464B', '#326771'];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={COLORS[index % COLORS.length]}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const PieChartWrapper = ({ data, title }: Props) => {
  const isMobile = useMedia('(max-width: 767px)');
  const [radius, setRadius] = useState(100);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setRadius(80);
    } else {
      setRadius(100);
    }
  }, [isMobile]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
      }}
    >
      <Typography color="primary" variant="h3">
        {title}
      </Typography>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          innerRadius={radius - 20}
          outerRadius={radius}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartWrapper;
