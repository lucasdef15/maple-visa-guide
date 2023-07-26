import p1 from '/assets/imgs/p1.jpg';
import styled from 'styled-components';
import { Slider } from './slider/Slider';

const MainContent = styled.main`
  text-align: center;
  display: grid;
  place-content: center;
  margin-top: 2rem;
  & p {
    color: ${(props) => props.theme.light.grey500};
  }
`;
const SliderStyle = styled.div`
  margin-block: 60px;
  display: flex;
  place-content: center;
  width: max-content;
  position: relative;
  & img {
    display: block;
    width: 90%;
    max-width: 952.3px;
    min-height: 445px;
    object-fit: cover;
    border-radius: ${(props) => props.theme.border.primary};
  }
`;

const SliderCard = styled.div`
  position: absolute;
  width: 282.9px;
  height: 380.19px;
  background-color: #ffffff;
  border-radius: ${(props) => props.theme.border.primary};
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding-block: 1.8rem;
  display: grid;
  gap: 1rem;
  & h4 {
    font-size: 48px;
    color: ${(props) => props.theme.light.blue700};
  }
  & p {
    font-size: 16px;
    font-weight: 700;
  }
`;

export default function Hero() {
  return (
    <MainContent className='spacing'>
      <div>
        <h1>Bem-vindo ao Maple Visa Guide!</h1>
        <p>
          Conte conosco para tornar seu sonho de viajar para o exterior uma
          realidade!
        </p>
      </div>

      <SliderStyle>
        <Slider />
        {/* <img src={p1} alt='slider' /> */}

        {/* <SliderCard>
          <div>
            <h4>120k</h4>
            <p>Vistos Abordados</p>
          </div>
          <div>
            <h4>200+</h4>
            <p>Viajantes Satisfeitos</p>
          </div>
          <div>
            <h4>15k+</h4>
            <p>Menbros</p>
          </div>
        </SliderCard> */}
      </SliderStyle>
    </MainContent>
  );
}
