import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

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
  width: '100%',
  paddingTop: '90px',
  '@media (min-width: 700px)': {
    paddingTop: '0',
  },
  '& h1': {
    fontSize: 'clamp(32px, 5vw, 48px)',
    marginBottom: '1.5rem',
    whiteSpace: 'nowrap',
    lineHeight: '35px',
    opacity: 0,
    top: '-99px',
    position: 'relative',
    '@media (max-width: 800px)': {
      lineHeight: '25px',
    },
  },
  '& span': {
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 'bold',
    opacity: 0,
    top: '-99px',
    position: 'relative',
  },
  '& p': {
    fontSize: 'clamp(16px, 2vw, 20px)',
    opacity: 0,
    top: '-99px',
    position: 'relative',
  },
  '& .about-wrapper': {
    width: '80%',
    maxWidth: '1080px',
  },
}));

export default function AboutHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });
  return (
    <StyledHero>
      <StyledHeroTitle className='spacing'>
        <div className='about-wrapper'>
          <span ref={ref} className={inView ? 'fromTop' : ''}>
            Bem-Vindo ao
          </span>
          <h1 ref={ref} className={inView ? 'fromTop' : ''}>
            Maple Visa Guide!
          </h1>
          <p ref={ref} className={inView ? 'fromTop' : ''}>
            Seu Especialista na Imigração para o Canadá e os EUA!
          </p>
        </div>
      </StyledHeroTitle>
    </StyledHero>
  );
}
