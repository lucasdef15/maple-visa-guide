import { styled } from '@mui/material/styles';
import logo from '/logo.svg';
import BadgeAvatars from './BadgeAvatars';
import ContainedButton from '../buttons/Button';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';
import { Stack } from '@mui/material';
import MobileNavBar from './MobileNav/MobileNavBar';
import MainContext from '../../contexts/MainContext';

const HeaderStrip = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '.7rem',
  fontWeight: 700,
  fontSize: '18px',
  '& span': {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'clamp(16px, 2vw, 18px)',
    '& svg': {
      marginRight: '10px',
    },
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
  justifyContent: 'center',
  paddingBlock: '1.5rem',
  background: '#f7f7f7dd',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.137)',
  width: '100%',
  position: 'sticky',
  top: '0',
  '& nav': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 'clamp(2rem, 5vw, 5rem)',
    position: 'sticky',

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
    color: '#333333cf',
    fontWeight: 'bold',
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

const MobileNav = styled(Stack)(() => ({
  width: '100%',
  height: '15vh',
  justifyContent: 'center',
  paddingBlock: '1.5rem',
  background: '#f7f7f7dd',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.137)',
  position: 'fixed',
  right: 0,
  top: 0,
}));

export default function Header() {
  const [, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const { isOpen } = useContext(MainContext);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || window.pageYOffset;
      setScrollPosition(position);

      setShowHeader(position < lastScrollPosition);
      setLastScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <>
      <Stack
        sx={{
          width: '100%',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <HeaderStrip>
          <Stack
            className='spacing'
            direction='row'
            alignItems='center'
            spacing={5}
            sx={{ width: '100%' }}
          >
            <span>
              <AiFillPhone />
              +1 (416) 900-8111
            </span>
            <span>
              <IoMdMail />
              info@newintercambio.com
            </span>
          </Stack>
        </HeaderStrip>
        <HeaderStyle
          style={{
            top: showHeader ? 0 : isOpen ? 0 : '-200px',
            transition: 'top 0.3s',
          }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            spacing={5}
            sx={{
              width: '100%',
              maxWidth: '1080px',
              position: 'sticky',
              top: 0,
            }}
          >
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
          </Stack>
        </HeaderStyle>
      </Stack>

      <MobileNav
        sx={{
          display: { xs: 'flex', sm: 'none' },
          top: showHeader ? 0 : '-200px',
          transition: 'top 0.3s',
          paddingInline: '1rem',
          alignItems: 'start',
          justifyContent: 'center',
          width: '100%',
          zIndex: 999,
        }}
      >
        <Logo>
          <img src={logo} alt='logo' />
        </Logo>
        <MobileNavBar />
      </MobileNav>
    </>
  );
}
