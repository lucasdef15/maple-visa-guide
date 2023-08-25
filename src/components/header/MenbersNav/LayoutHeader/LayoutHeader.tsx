import { Stack } from '@mui/material';
import HeaderNav from './HeaderNav';
import HeaderSearchBar from './HeaderSearchBar';

export default function LayoutHeader() {
  return (
    <Stack direction={'column'} sx={{ height: '23.5%' }}>
      <HeaderNav />
      <HeaderSearchBar />
    </Stack>
  );
}
