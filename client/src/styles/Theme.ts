import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    common: {
      black: '#2C2C2C',
      white: '#fff',
    },
    primary: {
      main: '#000088',
      light: '#01487c',
      dark: '#01244a',
    },
  },
  shape: {
    borderRadius: 25,
  },
  typography: {
    fontFamily: "'Candara', 'system-ui'",
  },
});

export default Theme;
