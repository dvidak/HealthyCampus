import { Grid, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { usePrevious } from 'react-use';
import BarChartWrapper from '../components/BarChar';
import fitbitService from '../services/fitbit';
import statisticService from '../services/statistic';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const Dashboard = () => {
  const userId = Number(localStorage.getItem('userId'));

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const prevStartDate = usePrevious(startDate);
  const prevEndDate = usePrevious(endDate);

  const [caloriesPeriodicData, setCaloriesPeriodicData] = useState(null);
  const [distancePeriodicData, setDistancePeriodicData] = useState(null);
  const [stepsPeriodicData, setStepsPeriodicData] = useState(null);
  const [floorsData, setFloorsData] = useState(null);
  const [elevationData, setElevationData] = useState(null);

  const fetchUnitActivityCompletionRate = useCallback(async () => {
    const response =
      await statisticService.getUnitActivityCompletionRateForUser(userId);
    setCaloriesPeriodicData(response);
  }, [userId]);

  const fetchPeriodicCaloriesData = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await fitbitService.getPeriodicCaloriesData(
        userId,
        startDate,
        endDate,
      );

      setCaloriesPeriodicData(response);
    },
    [userId],
  );

  const fetchPeriodicStepsData = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await fitbitService.getPeriodicStepsData(
        userId,
        startDate,
        endDate,
      );
      setStepsPeriodicData(response);
    },
    [userId],
  );

  const fetchPeriodicDataFloors = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await fitbitService.getPeriodicFloorsData(
        userId,
        startDate,
        endDate,
      );
      setFloorsData(response);
    },
    [userId],
  );

  const fetchPeriodicElevationData = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await fitbitService.getPeriodicElevationData(
        userId,
        startDate,
        endDate,
      );
      setElevationData(response);
    },
    [userId],
  );

  const fetchPeriodicDataDistance = useCallback(
    async (startDate: string, endDate: string) => {
      const response = await fitbitService.getPeriodicDistanceData(
        userId,
        startDate,
        endDate,
      );

      const mapReponse =
        response &&
        response.map((element: { dateTime: string; distance: number }) => ({
          dateTime: element.dateTime,
          distance: Math.round(element.distance * 1000),
        }));

      setDistancePeriodicData(mapReponse);
    },
    [userId],
  );

  useEffect(() => {
    fetchUnitActivityCompletionRate();
  }, [fetchUnitActivityCompletionRate]);

  useEffect(() => {
    const isDefined = startDate !== '' && endDate !== '';
    if (isDefined) {
      fetchPeriodicCaloriesData(startDate, endDate);
      fetchPeriodicStepsData(startDate, endDate);
      fetchPeriodicDataFloors(startDate, endDate);
      fetchPeriodicElevationData(startDate, endDate);
      fetchPeriodicDataDistance(startDate, endDate);
    }
  }, [
    startDate,
    endDate,
    prevStartDate,
    prevEndDate,
    fetchPeriodicCaloriesData,
    fetchPeriodicStepsData,
    fetchPeriodicDataDistance,
    fetchPeriodicDataFloors,
    fetchPeriodicElevationData,
  ]);

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography
          sx={{ marginTop: 2, marginLeft: 2 }}
          color="primary"
          variant="h4"
        >
          Choose period
        </Typography>
      </Grid>
      <Grid item md={2} xs={12}>
        <TextField
          sx={{ margin: 2 }}
          label="Start date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item md={2}>
        <TextField
          sx={{ margin: 2 }}
          label="End date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item md={8}></Grid>
      <Grid item md={4} xs={12}>
        {caloriesPeriodicData && (
          <BarChartWrapper
            title="Calories"
            data={caloriesPeriodicData}
            dataKeyX="dateTime"
            dataKeyBar="activityCalories"
          ></BarChartWrapper>
        )}
      </Grid>
      <Grid item md={4} xs={12}>
        {stepsPeriodicData && (
          <BarChartWrapper
            title="Steps"
            data={stepsPeriodicData}
            dataKeyX="dateTime"
            dataKeyBar="steps"
          ></BarChartWrapper>
        )}
      </Grid>
      <Grid item md={4} xs={12}>
        {distancePeriodicData && (
          <BarChartWrapper
            title="Distance"
            data={distancePeriodicData}
            dataKeyX="dateTime"
            dataKeyBar="distance"
          ></BarChartWrapper>
        )}
      </Grid>
      <Grid item md={6} xs={12}>
        {floorsData && (
          <BarChartWrapper
            title="Floors"
            data={floorsData}
            dataKeyX="dateTime"
            dataKeyBar="floors"
          ></BarChartWrapper>
        )}
      </Grid>
      <Grid item md={6} xs={12}>
        {elevationData && (
          <BarChartWrapper
            title="Elevation"
            data={elevationData}
            dataKeyX="dateTime"
            dataKeyBar="elevation"
          ></BarChartWrapper>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
