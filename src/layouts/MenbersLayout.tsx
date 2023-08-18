import { Outlet } from 'react-router-dom';
import MenbersNav from '../components/header/MenbersNav/MenbersNav';
import { Stack } from '@mui/material';
import LayoutHeader from '../components/header/MenbersNav/LayoutHeader/LayoutHeader';
import MainContext from '../contexts/MainContext';
import { useContext } from 'react';
import ScrollToTop from '../components/scroll/ScrollToTop';
import { DarkModeContext } from '../contexts/DarkModeContext';

export default function MenbersLayout() {
  const { openMenu } = useContext(MainContext);

  const { darkMode } = useContext(DarkModeContext);

  const styledLayout = {
    zIndex: -1,
    position: 'relative',
    minHeight: '100vh',
    background: darkMode ? '#111' : 'unset',
  };

  const styledContainer = {
    width: 'calc(100%)',
    marginLeft: openMenu ? '275px' : '76px',
    zIndex: -1,
    position: 'relative',
  };
  return (
    <>
      <ScrollToTop />
      <Stack sx={styledLayout} direction='row'>
        <MenbersNav />
        <Stack sx={styledContainer}>
          <LayoutHeader />
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
}
