import { Stack } from '@mui/material';
import HeaderNav from './HeaderNav';
import HeaderSearchBar from './HeaderSearchBar';
import { useLocation } from 'react-router-dom';

export default function LayoutHeader() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Stack direction={'column'} sx={{ maxHeight: '170px' }}>
      <HeaderNav />
      {location.pathname.includes('guias') &&
        !location.pathname.includes('write') && <HeaderSearchBar />}
    </Stack>
  );
}
