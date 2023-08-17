import { styled } from '@mui/material/styles';
import Slider from './slider/index';
import { Typography, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const MainContent = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  minHeight: 'calc(100vh - 250px)',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    textAlign: 'center',
  },
  '& .hero-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1080px',
  },
  '& .hero-title': {
    marginBlock: '3rem',
    '@media (max-width: 768px)': {
      paddingInline: '1rem',
    },
  },
  '& h1': {
    fontSize: 'clamp(34px, 6vw, 48px)',
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  '& p': {
    color: theme.palette.text.secondary,
    fontSize: 'clamp(15px, 1.5vw, 16px)',
    lineHeight: '20px',
  },
}));

export default function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });

  return (
    <MainContent className='spacing' sx={{ mt: { xs: '100px', sm: '0' } }}>
      <div className='hero-wrapper'>
        <div className='hero-title'>
          <Typography
            ref={ref}
            className={inView ? 'fromTop' : ''}
            variant='h1'
            sx={{
              mb: { xs: '20px', sm: '0' },
              opacity: 0,
              top: '-99px',
              position: 'relative',
            }}
          >
            Bem-vindo ao Maple Visa Guide!
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
          >
            Conte conosco para tornar seu sonho de viajar para o exterior uma
            realidade!
          </Typography>
        </div>
        <Slider />
      </div>
    </MainContent>
  );
}
