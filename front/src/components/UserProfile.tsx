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
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../models/User';
import userService from '../services/user';

interface Props {
  user: User;
  handleFitbitLogin: () => void;
}

const UserProfile = ({ user, handleFitbitLogin }: Props) => {
  const hiddenFileInput = useRef(null);
  const [imagePreview, setImagePreview] = useState<string | null>('');

  const handleClick = (event: any) => {
    (hiddenFileInput.current as any).click();
  };

  useEffect(() => {}, [imagePreview]);

  const handleSave = async () => {
    if (imagePreview) {
      await userService.updateUserImage({
        id: user.id,
        url: imagePreview,
      });

      setImagePreview(null);
    }
  };

  const handleImageChange = (e: any) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      const url = reader.result as any;
      setImagePreview(url);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Avatar
            src={imagePreview ? imagePreview : user.avatar}
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
        {imagePreview && (
          <Button
            onClick={handleSave}
            color="secondary"
            variant="contained"
            fullWidth
          >
            Save
          </Button>
        )}
        {!imagePreview && (
          <Button onClick={handleClick} color="primary" fullWidth>
            Upload picture
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default UserProfile;
