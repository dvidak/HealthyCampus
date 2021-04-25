import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import theme from '../sass/layout/theme';
import { AppRouter } from './routes/AppRouter';

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
