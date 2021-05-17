import React from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
];

const ActivityStatisticForStudent = () => {
  let { id } = useParams();

  console.log(id);

  return (
    <Paper>
      <Chart data={data}>
        <PieSeries valueField="area" argumentField="country" />
        <Title text="Area of Countries" />
        {/* <Animation /> */}
      </Chart>
    </Paper>
  );
};

export default ActivityStatisticForStudent;
