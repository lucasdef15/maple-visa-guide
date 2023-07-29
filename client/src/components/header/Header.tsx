import { styled } from '@mui/material/styles';
import logo from '/logo.svg';
import BadgeAvatars from './BadgeAvatars';
import ContainedButton from '../buttons/Button';
import { NavLink } from 'react-router-dom';

const HeaderStrip = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '1rem',
  fontWeight: 700,
  fontSize: '18px',
  '& p ': {
    color: theme.palette.common.white,
  },
}));

const Logo = styled('div')(() => ({
  '& img': {
    width: '105px',
    height: '50px',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  display: 'flex',
  paddingBlock: '2rem',

  '& nav': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 'clamp(2rem, 5vw, 5rem)',

    '& ul': {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      fontSize: '1rem',
      color: theme.palette.text.secondary,
    },
  },
  '& .active': {
    position: 'relative',
  },
  '& .active::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    opacity: 1,
    height: '1px',
    bottom: '-5px',
    backgroundColor: theme.palette.primary.light,
  },
  '& li': {
    position: 'relative',
  },
  '& li::before': {
    content: '""',
    position: 'absolute',
    width: '0',
    opacity: 0,
    height: '1px',
    bottom: '-5px',
    backgroundColor: theme.palette.primary.light,
    transition: 'width 150ms linear',
  },
  '& li:hover:not(.not)::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    opacity: 1,
    height: '1px',
    bottom: '-5px',
    backgroundColor: theme.palette.primary.light,
  },
}));

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
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/sobre'>Sobre</NavLink>
            </li>
            <li>
              <NavLink to='/contato'>Contato</NavLink>
            </li>
            <li>
              <NavLink to='/assinantes'>Assinantes</NavLink>
            </li>
          </ul>
          <ul>
            <li className='not'>
              <BadgeAvatars />
            </li>
            <li className='not'>
              <ContainedButton text='Sign Up' />
            </li>
          </ul>
        </nav>
      </HeaderStyle>
    </>
  );
}
