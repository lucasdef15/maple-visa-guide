import { Typography, Stack } from '@mui/material';

export default function GuiasHeader() {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ textAlign: 'center' }}
    >
      <Typography fontSize='48px' fontWeight='bold'>
        Acesse Nossos Guias
      </Typography>
      <Typography fontSize={16} color='text.secondary'>
        Aproveite 6 Meses de Acesso Ilimitado à Nossa Área VIP! Explore alguns
        exemplos dos guias disponíveis.
      </Typography>
    </Stack>
  );
}
