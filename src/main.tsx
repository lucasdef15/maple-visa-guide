import { DataProvider } from './contexts/MainContext.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './styles/Animations.css';
import './styles/GlobalStyled.css';
import { UserProvider } from './contexts/UserContext.tsx';
import { CategoryProvider } from './contexts/CategoryContext.tsx';
import { DarkModeProvider } from './contexts/DarkModeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <UserProvider>
        <CategoryProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </CategoryProvider>
      </UserProvider>
    </DataProvider>
  </React.StrictMode>
);
