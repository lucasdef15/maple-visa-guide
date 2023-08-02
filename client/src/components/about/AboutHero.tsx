import { styled } from '@mui/material/styles';

const StyledHero = styled('section')(() => ({
  backgroundColor: '#222',
  backgroundImage: 'url(./assets/imgs/aboutBg.jpg)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: '10rem 1rem 10rem 1rem',
  color: '#fff',
}));
const StyledHeroTitle = styled('section')(() => ({
  width: '90%',
  paddingTop: '90px',
  '& h1': {
    fontSize: '32px',
    marginBottom: '1rem',
  },
  '& p': {
    fontSize: '16px',
  },
}));

export default function AboutHero() {
  return (
    <StyledHero>
      <StyledHeroTitle>
        <h1>Bem-Vindo ao Maple Visa Guide!</h1>
        <p>Seu Especialista na Imigração para o Canadá e os EUA!</p>
      </StyledHeroTitle>
    </StyledHero>
  );
}
