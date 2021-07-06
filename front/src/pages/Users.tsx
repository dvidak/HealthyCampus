import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useCallback, useEffect, useState } from 'react';
import { UserListType } from '../models/User';
import userService from '../services/user';

const UsersPage = () => {
  const [users, setUsers] = useState<UserListType[]>([]);

  const fetchUsers = useCallback(async () => {
    const fetchedUsers = await userService.getUsers();
    setUsers(fetchedUsers);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <TableContainer
      sx={{ width: '80%', margin: '5rem auto' }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Full name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Unit
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="secondary" variant="subtitle1">
                Role
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="secondary" variant="subtitle1">
                Connect to Fitbit
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((row: UserListType) => (
              <TableRow key={row.fullName}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.unitName}</TableCell>
                <TableCell>{row.roleName}</TableCell>
                <TableCell align="right">
                  {row.fitbit ? <LockIcon /> : <LockOpenIcon />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersPage;
