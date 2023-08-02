import { styled } from '@mui/material/styles';
import aboutArt from '/assets/imgs/aboutArt.png';

const StyledAboutContent = styled('section')(() => ({
  '& img': {
    marginBottom: '3rem',
  },
}));
const AboutContentWrapper = styled('section')(({ theme }) => ({
  padding: '3rem 1rem 0 1rem',
  '& h2': {
    fontSize: '40px',
    color: theme.palette.primary.light,
    marginBottom: '1.5rem',
  },
  '& p': {
    fontSize: '20px',
    marginBottom: '1rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

export default function AboutContent() {
  return (
    <StyledAboutContent>
      <AboutContentWrapper>
        <h2>Sobre Nós</h2>
        <p>
          Nossa missão é simplificar e tornar compreensível o processo de
          aplicação para o seu visto. Aqui, você encontrará todas as informações
          necessárias para compreender o funcionamento do processo e receber
          orientações detalhadas sobre o preenchimento dos formulários.
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
          Dê as boas-vindas ao Maple Visa Guide e conte conosco para tornar seu
          sonho de viajar para o exterior uma realidade!
        </p>
      </AboutContentWrapper>
      <img src={aboutArt} alt='canada art' />
    </StyledAboutContent>
  );
}
