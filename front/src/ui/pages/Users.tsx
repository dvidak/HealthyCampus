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
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../../models/User';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import userService from '../../services/user';

const UsersPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchUsers = useCallback(async () => {
    const fetchedUsers = await userService.getUsers();
    setUsers(fetchedUsers);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <TableContainer className="user-table" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="secondary" variant="h5">
                All users
              </Typography>
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
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
                Connected to Fitbit
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((row) => (
              <TableRow key={row.firstName}>
                <TableCell component="th" scope="row">
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.userUnit.unit.name}</TableCell>
                <TableCell>{row.role.roleName}</TableCell>
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
