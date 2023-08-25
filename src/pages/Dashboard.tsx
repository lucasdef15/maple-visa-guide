import { Stack } from '@mui/material';

export default function Dashboard() {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        minHeight: 'calc(100vh - 250px)',
      }}
    ></Stack>
  );
}
