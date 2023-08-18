import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './routes/AnimatedRoutes';
import { ThemeProvider } from '@mui/material/styles';
import { DarkModeContext } from './contexts/DarkModeContext';
import { useContext } from 'react';
import Theme from './styles/Theme';

export default function App() {
  const { darkMode } = useContext(DarkModeContext);
  const theme = Theme(darkMode);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
