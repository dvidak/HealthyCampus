import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { User } from '../models/User';
import moment from 'moment';

interface Props {
  user: User;
  handleFitbitLogin: () => void;
}

const UserProfile = ({ user, handleFitbitLogin }: Props) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h3">
          {user.firstName} {user.lastName}
        </Typography>
        {user?.fitbit?.fitbitId && (
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CheckCircleIcon sx={{ marginRight: 1 }} color="secondary" />{' '}
            Connected to fitbit
          </Typography>
        )}

        <Typography color="textSecondary" variant="body1">
          {`${moment().format('hh:mm A')}`}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    {!user?.fitbit?.fitbitId && (
      <CardActions>
        <Button variant="contained" fullWidth onClick={handleFitbitLogin}>
          Connect to FitBit
        </Button>
      </CardActions>
    )}

    <Divider />
    <CardActions>
      <Button color="primary" fullWidth>
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default UserProfile;
