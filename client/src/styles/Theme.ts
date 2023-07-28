import { createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#01244a',
      light: '#01487c',
      dark: '#01244a',
    },
  },
  shape: {
    borderRadius: 25,
  },
});

export default Theme;
