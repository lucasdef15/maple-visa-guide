import styled from 'styled-components';
import Slider from './slider/index';
// import Carousel from './slider/Carousel';

const MainContent = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  place-content: center;
  margin-top: 3rem;
  margin-bottom: 10rem;
  & p {
    color: ${(props) => props.theme.light.grey500};
  }
  & .hero-title {
    margin-bottom: 3rem;
  }
`;

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
