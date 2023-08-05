import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import MainContext from '../../../contexts/MainContext';
import Logo from '../../logo/Logo';
import ModalComponent from '../../modal/Modal';
// import BadgeAvatars from '../BadgeAvatars';
// import ContainedButton from '../../buttons/Button';

const DesktopHeaderWrapper = styled('div')(() => ({
  position: 'sticky',
  top: '0',
  zIndex: 999,
  '@media (max-width: 700px)': {
    display: 'none',
  },
}));
const HeaderStyle = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: '1.5rem',
  background: '#f7f7f7dd',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.137)',
  width: '100%',
  '@media (max-width: 1100px)': {
    paddingInline: '1rem',
  },
  '& nav': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 'clamp(1rem, 3vw, 3rem)',

    '& ul': {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
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

export default function DesktopNavBar() {
  const { showHeader, isOpen } = useContext(MainContext);

  return (
    <DesktopHeaderWrapper
      style={{
        top: showHeader ? 0 : isOpen ? 0 : '-200px',
        transition: '0.3s',
      }}
    >
      <HeaderStyle>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            maxWidth: '1080px',
          }}
        >
          <Logo />
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
                <NavLink to='/assinantes'>Assinar</NavLink>
              </li>
            </ul>
            <ul>
              <li className='not'>
                <ModalComponent
                  text='Signup'
                  variant='outlined'
                  color='secondary'
                />
              </li>
              <li className='not'>
                <ModalComponent
                  text='Login'
                  variant='contained'
                  color='secondary'
                />
              </li>
              {/* <li className='not'>
                <BadgeAvatars />
              </li>
              <li className='not'>
                <ContainedButton text='Sign Up' />
              </li> */}
            </ul>
          </nav>
        </div>
      </HeaderStyle>
    </DesktopHeaderWrapper>
  );
}
