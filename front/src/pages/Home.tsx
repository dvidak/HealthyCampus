import { Box, Grid, InputLabel, Select } from '@material-ui/core';
import { orderBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivitiesDetailsTable from '../components/ActivitiesDetailsTable';
import BarChartWrapper from '../components/BarChar';
import { Activity } from '../models/Activity';
import activityService from '../services/activity';
import statisticService from '../services/statistic';
import { activityOptions } from '../shared/helpers';

const Home = () => {
  const navigate = useNavigate();
  const roleId = Number(localStorage.getItem('roleId'));
  const userId = Number(localStorage.getItem('userId'));
  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);

  const [activityCalories, setActivityCalories] = useState([]);
  const [activityDistance, setActivityDistance] = useState([]);
  const [activityDuration, setActivityDuration] = useState([]);
  const [activitiesOptions, setActivitiesOptions] = useState<Activity[]>();
  const [activtiesCompletionRate, setActivtiesCompetion] = useState<any>();
  const [activitiesPopularity, setActivitiesPopularity] = useState<any>();

  const fetchProfesorActivitiesStatistic = useCallback(async () => {
    const response = await statisticService.getProfesorActivitiesStatistic(
      userId,
    );

    const sortedPercentage = orderBy(
      response?.popularity,
      (a) => a.percentage,
      ['desc'],
    );
    const sortedCompletitionRate = orderBy(
      response?.completionRate,
      (a) => a.percentage,
      ['desc'],
    );
    setActivtiesCompetion(sortedCompletitionRate);
    setActivitiesPopularity(sortedPercentage);
  }, [userId]);

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivitiesForProf();
    const options = activityOptions(response);
    setActivitiesOptions(options);
    setSelectedActivityId(options[0]?.id);
  }, []);

  const fetchActivityCalories = useCallback(async () => {
    if (selectedActivityId) {
      const response =
        await statisticService.getActivityCaloriesPercentagesPerUsers(
          selectedActivityId,
        );
      setActivityCalories(response?.statistic);
    }
  }, [selectedActivityId]);

  const fetchActivityDistances = useCallback(async () => {
    if (selectedActivityId) {
      const response =
        await statisticService.getActivityDistancePercentagesByUser(
          selectedActivityId,
        );
      setActivityDistance(response?.statistic);
    }
  }, [selectedActivityId]);

  const fetchActivityDuration = useCallback(async () => {
    if (selectedActivityId) {
      const response =
        await statisticService.getActivityDurationPercentagesByUser(
          selectedActivityId,
        );
      setActivityDuration(response?.statistic);
    }
  }, [selectedActivityId]);

  useEffect(() => {
    if (roleId === 1) {
      navigate('/app/admin', { replace: true });
    }
    if (roleId === 2) {
      navigate('/app/dashboard', { replace: true });
    }
    fetchActivities();
    fetchProfesorActivitiesStatistic();
  }, [fetchActivities, fetchProfesorActivitiesStatistic, navigate, roleId]);

  useEffect(() => {
    fetchActivityCalories();
    fetchActivityDistances();
    fetchActivityDuration();
  }, [fetchActivityCalories, fetchActivityDistances, fetchActivityDuration]);

  const handleChange = (event: React.ChangeEvent<{ value: number }>) => {
    setSelectedActivityId(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        py: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}></Grid>
        <Grid item md={3} xs={12}>
          <ActivitiesDetailsTable
            title="Activity completion rate"
            activities={activtiesCompletionRate}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <ActivitiesDetailsTable
            title="Activity popularity"
            activities={activitiesPopularity}
          />
        </Grid>
        <Grid item md={3} xs={12}></Grid>
        <Grid item md={6}>
          <InputLabel color="secondary" sx={{ marginLeft: '12%' }}>
            Activity
          </InputLabel>
          <Select
            sx={{ marginLeft: '12%', backgroundColor: 'white' }}
            id="id"
            defaultValue={selectedActivityId}
            onChange={handleChange}
            native
          >
            {activitiesOptions &&
              activitiesOptions.map((option: any) => (
                <option value={option.id}>{option.name}</option>
              ))}
          </Select>
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={4} xs={12}>
          <BarChartWrapper
            title="Calories statistic"
            data={activityCalories}
            dataKeyX="name"
            dataKeyBar="students"
          ></BarChartWrapper>
        </Grid>
        <Grid item md={4} xs={12}>
          <BarChartWrapper
            title="Distance statistic"
            data={activityDistance}
            dataKeyX="name"
            dataKeyBar="students"
          ></BarChartWrapper>
        </Grid>
        <Grid item md={4} xs={12}>
          <BarChartWrapper
            title="Duration statistic"
            data={activityDuration}
            dataKeyX="name"
            dataKeyBar="students"
          ></BarChartWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
