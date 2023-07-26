import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { GlobalSyle } from './styles/GlobalStyled.ts';
import theme from './styles/Theme.ts';
import App from './App.tsx';
import './styles/variables.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalSyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
