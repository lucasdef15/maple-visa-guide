import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import './styles/GlobalStyled.css';
import theme from './styles/Theme.ts';
import App from './App.tsx';
import { DataProvider } from './contexts/MainContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DataProvider>
  </React.StrictMode>
);
