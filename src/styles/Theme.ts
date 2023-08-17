import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#2C2C2C',
      white: '#fff',
    },
    primary: {
      main: '#000088',
      light: '#01487c',
      dark: '#01244a',
    },
    secondary: {
      main: '#01244a',
      dark: '#004473',
    },
  },
  shape: {
    borderRadius: 25,
  },
  typography: {
    fontFamily: "'Candara', 'system-ui'",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default Theme;
