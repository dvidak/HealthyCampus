import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';

const App = () => {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const routing = useRoutes(routes(isLoggedIn));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
