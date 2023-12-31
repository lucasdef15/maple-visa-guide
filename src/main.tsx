import { DataProvider } from './contexts/MainContext.tsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import './styles/Animations.css';
import './styles/GlobalStyled.css';
import { UserProvider } from './contexts/UserContext.tsx';
import { DarkModeProvider } from './contexts/DarkModeContext.tsx';
import { PostsDataProvider } from './contexts/PostsContext.tsx';
import { ForumProvider } from './contexts/ForumContext.tsx';
import { SocketProvider } from './contexts/SocketProvider.tsx';
import { QueryProvider } from './forum/components/providers/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <UserProvider>
        <PostsDataProvider>
          <ForumProvider>
            <DarkModeProvider>
              <SocketProvider>
                <QueryProvider>
                  <App />
                </QueryProvider>
              </SocketProvider>
            </DarkModeProvider>
          </ForumProvider>
        </PostsDataProvider>
      </UserProvider>
    </DataProvider>
  </React.StrictMode>
);
