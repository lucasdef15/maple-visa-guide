import { Stack } from '@mui/material';
import HeaderNav from './HeaderNav';
import HeaderSearchBar from './HeaderSearchBar';
import { useLocation } from 'react-router-dom';

export default function LayoutHeader() {
  const location = useLocation();

  return (
    <Stack direction={'column'} sx={{ maxHeight: '170px', width: '100%' }}>
      <HeaderNav />
      {location.pathname.includes('guias') &&
        !location.pathname.includes('write') &&
        !location.pathname.includes('edit') && <HeaderSearchBar />}
    </Stack>
  );
}
