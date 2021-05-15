import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import { default as React } from 'react';
import * as Yup from 'yup';

interface Props {
  createUniversity: (data: {}) => void;
}

const UniversityForm = ({ createUniversity }: Props) => {
  const handleSubmit = (data: any) => {
    createUniversity(data);
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
            name: Yup.string().max(20).required('Name is required'),
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
                  Create university
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

export default UniversityForm;
