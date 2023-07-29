import { styled } from '@mui/material/styles';
import Slider from '../slider/index';

const MainContent = styled('main')(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  placeContent: 'center',
  '& .hero-title': {
    marginBlock: '3rem',
  },
  '& h1': {
    fontSize: '48px',
    color: theme.palette.primary.main,
  },
  '& p': {
    color: theme.palette.text.secondary,
  },
}));

export default function Hero() {
  return (
    <MainContent className='spacing'>
      <div className='hero-title'>
        <h1>Bem-vindo ao Maple Visa Guide!</h1>
        <p>
          Conte conosco para tornar seu sonho de viajar para o exterior uma
          realidade!
        </p>
      </div>
      <Slider />
    </MainContent>
  );
}
