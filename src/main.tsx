import { ThemeProvider } from '@mui/material/styles';
import { DataProvider } from './contexts/MainContext.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import theme from './styles/Theme.ts';
import App from './App.tsx';
import './styles/Animations.css';
import './styles/GlobalStyled.css';
import { UserProvider } from './contexts/UserContext.tsx';
import { CategoryProvider } from './contexts/CategoryContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <UserProvider>
        <CategoryProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CategoryProvider>
      </UserProvider>
    </DataProvider>
  </React.StrictMode>
);
