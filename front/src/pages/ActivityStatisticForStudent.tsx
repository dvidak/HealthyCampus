import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarChartWrapper from '../components/BarChar';
import PieChartWrapper from '../components/PieChart';
import statisticService from '../services/statistic';

const ActivityStatisticForStudent = () => {
  let { id } = useParams();
  const [caloriesPercentage, setCaloriesPercentage] =
    useState<string | undefined>();
  const [distancePercentage, setDistancePercentage] =
    useState<string | undefined>();
  const [durationPercentage, setDurationPercentage] =
    useState<string | undefined>();
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
    setActivityCalories(response?.statistic);
    setCaloriesPercentage(response?.currentUserBucketName);
  }, [id]);

  const fetchActivityDistances = useCallback(async () => {
    const response =
      await statisticService.getActivityDistancePercentagesByUser(Number(id));
    setActivityDistance(response?.statistic);
    setDistancePercentage(response?.currentUserBucketName);
  }, [id]);

  const fetchActivityDuration = useCallback(async () => {
    const response =
      await statisticService.getActivityDurationPercentagesByUser(Number(id));
    setActivityDuration(response?.statistic);
    setDurationPercentage(response?.currentUserBucketName);
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
    <Grid container sx={{ width: '80%', margin: 'auto' }} spacing={3}>
      <Grid item md={6} xs={12}>
        <PieChartWrapper
          title=""
          data={activityCompletitionRate}
        ></PieChartWrapper>
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        md={6}
        xs={12}
      >
        <Card sx={{ width: '80%' }} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              More details about activitiy
            </Typography>
            <Typography variant="h5" component="h2">
              {' '}
              some
            </Typography>
            <Typography color="primary">blablabla</Typography>
            <Typography variant="body2" component="p">
              blablabla
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Calories statistic"
          data={activityCalories}
          dataKeyX="name"
          dataKeyBar="students"
          currentBucket={caloriesPercentage}
        ></BarChartWrapper>
      </Grid>
      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Distance statistic"
          data={activityDistance}
          dataKeyX="name"
          dataKeyBar="students"
          currentBucket={distancePercentage}
        ></BarChartWrapper>
      </Grid>
      <Grid item md={4} xs={12}>
        <BarChartWrapper
          title="Duration statistic"
          data={activityDuration}
          dataKeyX="name"
          dataKeyBar="students"
          currentBucket={durationPercentage}
        ></BarChartWrapper>
      </Grid>
    </Grid>
  );
};

export default ActivityStatisticForStudent;
