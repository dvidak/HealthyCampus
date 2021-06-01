import React, { useCallback, useEffect, useState } from 'react';
import fitbitService from '../services/fitbit';
import statisticService from '../services/statistic';

const Dashboard = () => {
  const userId = Number(localStorage.getItem('userId'));

  const [caloriesPeriodicData, setCaloriesPeriodicData] = useState();
  const [stepsPeriodicData, setStepsPeriodicData] = useState();
  const [minutesLightlyActiveData, setMinutesLightlyActiveData] = useState();
  const [minutesFairlyActiveData, setMinutesFairlyActiveData] = useState();

  const fetchUnitActivityCompletionRate = useCallback(async () => {
    const response =
      await statisticService.getUnitActivityCompletionRateForUser(userId);
    setCaloriesPeriodicData(response);
  }, [userId]);

  const fetchPeriodicCaloriesData = useCallback(async () => {
    const response = await fitbitService.getPeriodicCaloriesData(userId);
    setStepsPeriodicData(response);
  }, [userId]);

  const fetchPeriodicStepsData = useCallback(async () => {
    const response = await fitbitService.getPeriodicStepsData(userId);
    setMinutesLightlyActiveData(response);
  }, [userId]);

  const fetchPeriodicMinutesLightlyActiveData = useCallback(async () => {
    const response = await fitbitService.getPeriodicMinutesLightlyActiveData(
      userId,
    );
    setMinutesLightlyActiveData(response);
  }, [userId]);

  const fetchPeriodicMinutesFairlyActiveData = useCallback(async () => {
    const response = await fitbitService.getPeriodicMinutesFairlyActiveData(
      userId,
    );
    setMinutesFairlyActiveData(response);
  }, [userId]);

  useEffect(() => {
    fetchUnitActivityCompletionRate();
    fetchPeriodicCaloriesData();
    fetchPeriodicStepsData();
    fetchPeriodicMinutesLightlyActiveData();
    fetchPeriodicMinutesFairlyActiveData();
  }, [
    fetchUnitActivityCompletionRate,
    fetchPeriodicCaloriesData,
    fetchPeriodicStepsData,
    fetchPeriodicMinutesLightlyActiveData,
    fetchPeriodicMinutesFairlyActiveData,
  ]);

  return <div>Dashboard</div>;
};

export default Dashboard;
