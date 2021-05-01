import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface Props {
  createUnit: (data: {}) => void;
}
const UnitForm = ({ createUnit }: Props) => {
  const handleSubmit = (data: any) => {
    createUnit(data);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(10).required('Name is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }: any) => (
            <form onSubmit={handleSubmit}>
              <Box>
                <Typography color="textPrimary" variant="h2">
                  Create unit
                </Typography>
              </Box>

              <TextField
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Create
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default UnitForm;
