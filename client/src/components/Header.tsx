import styled from 'styled-components';
import logo from '/logo.svg';
import BadgeAvatars from './BadgeAvatars';
import ContainedButton from './Button';

const HeaderStrip = styled.div`
  background-color: ${(props) => props.theme.light.blue600};
  text-align: center;
  padding: 1rem;
  font-weight: 700;
  font-size: 18px;
  & p {
    color: ${(props) => props.theme.light.white100};
  }
`;

const Logo = styled.div`
  & img {
    width: 105px;
    height: 50px;
  }
`;
const HeaderStyle = styled.header`
  display: flex;
  padding-block: 2rem;

  & nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: clamp(2rem, 5vw, 5rem);

    & ul {
      list-style: none;
      display: flex;
      gap: 30px;
      font-size: 1rem;
      color: ${(props) => props.theme.light.blue800};
    }
  }
`;

export default function Header() {
  return (
    <>
      <HeaderStrip>
        <p>
          Come on quickly join our service, to maintain real estate. Register
          Now?
        </p>
      </HeaderStrip>
      <HeaderStyle className='spacing'>
        <Logo>
          <img src={logo} alt='logo' />
        </Logo>
        <nav>
          <ul>
            <li>Home</li>
            <li>Sobre</li>
            <li>Contato</li>
            <li>Assinantes</li>
          </ul>
          <ul>
            <li>
              <BadgeAvatars />
            </li>
            <li>
              <ContainedButton text='Sign Up' />
            </li>
          </ul>
        </nav>
      </HeaderStyle>
    </>
  );
}
