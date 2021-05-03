import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../models/Activity';
import activityService from '../services/activity';

const ActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>();

  const fetchActivities = useCallback(async () => {
    const response = await activityService.getActivities();
    setActivities(response);
  }, []);

  const onCreateClick = () => {
    navigate(generatePath('/app/activity/create'));
  };

  const onDetailsClick = (id: any) => {
    navigate(
      generatePath('/app/activity/details/:id', {
        id: id,
      }),
    );
  };

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <>
      <div>
        <Button onClick={onCreateClick}>Create</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="secondary" variant="h5">
                  Activities
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Period
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Goal distance
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Goal duration
                </Typography>
              </TableCell>{' '}
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Goal calories
                </Typography>
              </TableCell>{' '}
              <TableCell>
                <Typography color="secondary" variant="subtitle1">
                  Goal elevation
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities &&
              activities.map((activity) => (
                <TableRow key={activity.name}>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>
                    {activity.startDate} - {activity.endDate}
                  </TableCell>
                  <TableCell>{activity.goalDistance}</TableCell>
                  <TableCell>{activity.goalDuration}</TableCell>
                  <TableCell>{activity.goalCalories}</TableCell>
                  <TableCell>{activity.goalElevation}</TableCell>
                  <Button onClick={() => onDetailsClick(activity.id)}>
                    Edit
                  </Button>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ActivityPage;
