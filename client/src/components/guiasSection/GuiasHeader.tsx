import { Typography, Stack } from '@mui/material';

export default function GuiasHeader() {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ textAlign: 'center', paddingInline: { xs: '1rem', sm: '' } }}
    >
      <Typography sx={{ fontSize: 'clamp(34px, 6vw, 48px)' }} fontWeight='bold'>
        Acesse Nossos Guias
      </Typography>
      <Typography
        sx={{ fontSize: 'clamp(15px, 1.5vw, 16px)' }}
        color='text.secondary'
      >
        Aproveite 6 Meses de Acesso Ilimitado à Nossa Área VIP! Explore alguns
        exemplos dos guias disponíveis.
      </Typography>
    </Stack>
  );
}
