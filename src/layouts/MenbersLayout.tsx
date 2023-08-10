import { Outlet } from 'react-router-dom';
import MenbersHeader from '../components/header/MenbersNav/MenbersNav';
import { Stack } from '@mui/material';

const styledLayout = {
  backgroundColor: 'blue',
  zIndex: -1,
  minHeight: '100vh',
};

export default function MenbersLayout() {
  return (
    <Stack sx={styledLayout} direction='row'>
      <MenbersHeader />
      <Outlet />
    </Stack>
  );
}
