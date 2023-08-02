import { styled } from '@mui/material/styles';
import aboutArt from '/assets/imgs/aboutArt.png';

const StyledAboutContent = styled('section')(() => ({
  width: '100%',
  '& img': {
    marginBottom: '3rem',
  },
  '@media(min-width: 700px)': {
    width: '100%',
    paddingBottom: '6.5rem',
    marginBlock: '100px',
    '& .about-image': {
      width: '50%',
      scale: '1.1',
      float: 'right',
      shapeOutside:
        'polygon(570px 523px, 31.65% 89.45%, 27.36% 79.87%, 24.93% 56.01%, 20.94% 34.98%, 17.33% 15.14%)',
      marginLeft: '5rem',
      marginBottom: '2rem',
      position: 'relative',
      top: '-6vmin',
    },
  },
}));
const AboutContentWrapper = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '3rem 1rem 0 1rem',
  width: '100%',
  '@media(min-width: 700px)': {
    display: 'block',
    width: '100%',
    maxwidth: '1080px',
  },

  '& h2': {
    fontSize: 'clamp(40px, 10vw, 50px)',
    color: theme.palette.primary.light,
    marginBottom: '1.5rem',
    '@media(min-width: 700px)': {
      marginBottom: '2.35rem',
      marginTop: '2.35rem',
    },
  },
  '& p': {
    fontSize: '20px',
    lineHeight: '35px',
    letterSpacing: '.5px',
    marginBottom: '1rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

export default function AboutContent() {
  return (
    <StyledAboutContent className='spacing'>
      <AboutContentWrapper>
        <img className='about-image' src={aboutArt} alt='canada art' />
        <div>
          <h2>Sobre Nós</h2>
          <p>
            Nossa missão é simplificar e tornar compreensível o processo de
            aplicação para o seu visto. Aqui, você encontrará todas as
            informações necessárias para compreender o funcionamento do processo
            e receber orientações detalhadas sobre o preenchimento dos
            formulários.
          </p>
          <p>
            Além disso, oferecemos um guia passo a passo para que você saiba
            exatamente o que fazer e quais documentos apresentar para solicitar
            seu visto de forma independente, caso opte por esse caminho.
          </p>
          <p>
            Estamos comprometidos em auxiliá-lo em cada etapa do processo,
            garantindo que sua experiência seja a mais tranquila e bem-sucedida
            possível.
          </p>
          <p>
            Dê as boas-vindas ao Maple Visa Guide e conte conosco para tornar
            seu sonho de viajar para o exterior uma realidade!
          </p>
        </div>
      </AboutContentWrapper>
    </StyledAboutContent>
  );
}
