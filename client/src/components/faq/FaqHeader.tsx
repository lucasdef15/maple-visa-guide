import { Typography, Stack } from '@mui/material';

export default function GuiasHeader() {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ textAlign: 'center', mb: 8 }}
    >
      <Typography sx={{ fontSize: 'clamp(34px, 6vw, 48px)' }} fontWeight='bold'>
        Perguntas Frequentes
      </Typography>
      <Typography
        sx={{ fontSize: 'clamp(15px, 1.5vw, 16px)' }}
        color='text.secondary'
      >
        Perguntas Respondidas!
      </Typography>
    </Stack>
  );
}
