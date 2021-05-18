import { createMuiTheme, colors } from '@material-ui/core';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      main: '#326771',
    },
    secondary: {
      main: '#2c8c99',
    },
    text: {
      primary: '#28464B',
      secondary: '#6b778c',
    },
  },
  typography,
});

export default theme;
