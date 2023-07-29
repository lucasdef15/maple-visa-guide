import { Typography, Stack } from '@mui/material';

export default function GuiasHeader() {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ textAlign: 'center', mb: 8 }}
    >
      <Typography fontSize='48px' fontWeight='bold'>
        Frequently Asked Questions
      </Typography>
      <Typography fontSize={16} color='text.secondary'>
        Your Queries. Answered!
      </Typography>
    </Stack>
  );
}
