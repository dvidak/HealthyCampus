import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UserListType } from '../models/User';
import userService from '../services/user';

const UsersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const [users, setUsers] = useState<UserListType[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onSearchValueChange = useCallback((event: any) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchUsers = useCallback(async () => {
    const fetchedUsers = await userService.getUsers();
    setUsers(fetchedUsers);
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.fullName.toLocaleLowerCase().includes(searchValue) ||
          user.unitName.toLocaleLowerCase().includes(searchValue),
      ),
    [searchValue, users],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div style={{ width: '80%', margin: '5rem auto' }}>
      <TableContainer component={Paper}>
        <TextField
          size="small"
          label="Search by name or unit"
          sx={{ margin: '10px' }}
          value={searchValue}
          onChange={onSearchValueChange}
        ></TextField>
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
            {filteredUsers &&
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: UserListType) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UsersPage;
