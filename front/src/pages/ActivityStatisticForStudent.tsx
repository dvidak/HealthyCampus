import { Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarChartWrapper from '../components/BarChar';
import PieChartWrapper from '../components/PieChart';
import statisticService from '../services/statistic';

const ActivityStatisticForStudent = () => {
  let { id } = useParams();
  const [activityCompletitionRate, setActivityCompletitionRate] = useState([]);
  const [activityCalories, setActivityCalories] = useState([]);
  const [activityDistance, setActivityDistance] = useState([]);
  const [activityDuration, setActivityDuration] = useState([]);

  const fetchActivityCompletionRate = useCallback(async () => {
    const response = await statisticService.getActivityCompletionRate(
      Number(id),
    );
    setActivityCompletitionRate(response);
  }, [id]);

  const fetchActivityCalories = useCallback(async () => {
    const response =
      await statisticService.getActivityCaloriesPercentagesPerUsers(Number(id));
    setActivityCalories(response);
  }, [id]);

  const fetchActivityDistances = useCallback(async () => {
    const response =
      await statisticService.getActivityDistancePercentagesByUser(Number(id));
    setActivityDistance(response);
  }, [id]);

  const fetchActivityDuration = useCallback(async () => {
    const response =
      await statisticService.getActivityDurationPercentagesByUser(Number(id));
    setActivityDuration(response);
  }, [id]);

  useEffect(() => {
    fetchActivityCompletionRate();
    fetchActivityCalories();
    fetchActivityDistances();
    fetchActivityDuration();
  }, [
    fetchActivityCalories,
    fetchActivityCompletionRate,
    fetchActivityDistances,
    fetchActivityDuration,
  ]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <PieChartWrapper
          title="Completition rate"
          data={activityCompletitionRate}
        ></PieChartWrapper>
      </Grid>
      <Grid item md={6} xs={12}>
        Add some general data
      </Grid>

      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Calories statistic"
          data={activityCalories}
        ></BarChartWrapper>
      </Grid>
      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Distance statistic"
          data={activityDistance}
        ></BarChartWrapper>
      </Grid>
      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Duration statistic"
          data={activityDuration}
        ></BarChartWrapper>
      </Grid>
    </Grid>
  );
};

export default ActivityStatisticForStudent;
