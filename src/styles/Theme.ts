import { createTheme } from '@mui/material';

function Theme(dark: boolean) {
  const theme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      common: {
        black: '#2C2C2C',
        white: '#fff',
      },
      primary: {
        main: '#000088',
        light: '#01487c',
        dark: '#01244a',
        contrastText: '#fff',
      },
      secondary: {
        main: '#01244a',
        dark: '#004473',
        contrastText: '#fff',
      },
    },
    shape: {
      borderRadius: 25,
    },
    typography: {
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
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

  return theme;
}

export default Theme;
