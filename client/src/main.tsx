import { ThemeProvider } from '@mui/material/styles';
import { DataProvider } from './contexts/MainContext.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import theme from './styles/Theme.ts';
import App from './App.tsx';
import './styles/Animations.css';
import './styles/GlobalStyled.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </React.StrictMode>
);
