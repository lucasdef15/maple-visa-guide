import { Outlet, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useState } from 'react';
import ScrollToTop from '../components/scroll/ScrollToTop';
// import MobileMenbersNavBar from '../components/header/MobileMenbersNav.tsx/MobileMenbersNavBar';
import NavigationSidebar from '../forum/components/sidebar/NavigationSidebar';
import ModalProvider from '../forum/components/providers/ModalProvider';
import { styled } from '@mui/material/styles';
import MembersAppbar from '../components/header/MenbersNav/HeaderMenu/MembersAppbar';
import MembersDrawer from '../components/header/MenbersNav/drawer/MembersDrawer';
import { DrawerHeader } from '../components/header/MenbersNav/drawer/MembersDrawer';

export const DRAWER_WIDTH = 275;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default function MenbersLayout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Stack direction='row' sx={{ position: 'relative', zIndex: '-1' }}>
        <ModalProvider />
        <MembersDrawer open={open} handleDrawerClose={handleDrawerClose} />
        {/* <MobileMenbersNavBar /> */}
        {location.pathname.includes('forum') ? (
          <Stack
            sx={{
              width: '100%',
              position: 'relative',
              zIndex: '-1',
            }}
            direction={'row'}
          >
            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <NavigationSidebar />
            </Stack>
            <Outlet />
          </Stack>
        ) : (
          <>
            <MembersAppbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Main open={open} sx={{ position: 'relative', zIndex: '-1' }}>
              <DrawerHeader />
              <Outlet />
            </Main>
          </>
        )}
      </Stack>
    </>
  );
}
