import { Typography, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';

export default function GuiasHeader() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      spacing={2}
      sx={{ textAlign: 'center', mb: 8 }}
    >
      <Typography
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          fontSize: 'clamp(34px, 6vw, 48px)',
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
        fontWeight='bold'
      >
        Perguntas Frequentes
      </Typography>
      <Typography
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          fontSize: 'clamp(15px, 1.5vw, 16px)',
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
        color='text.secondary'
      >
        Perguntas Respondidas!
      </Typography>
    </Stack>
  );
}
