import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import MainContext from '../../../contexts/MainContext';
import Logo from '../../logo/Logo';
import ModalComponent from '../../modal/Modal';
import BadgeAvatars from '../BadgeAvatars';
import { UserContext } from '../../../contexts/UserContext';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DesktopHeaderWrapper = styled('div')(() => ({
  position: 'sticky',
  top: '0',
  zIndex: 999,
  '@media (max-width: 750px)': {
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
  '& svg': {
    width: '15%',
    minWidth: '150px',
  },
  '& nav': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    '& ul:not(.notGap)': {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '6vmin',
      fontSize: '1rem',
      color: theme.palette.text.secondary,
    },
    '& .notGap': {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      fontSize: '1rem',
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
  const { user, handleLogout } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <DesktopHeaderWrapper
      style={{
        top: showHeader ? 0 : isOpen ? 0 : '-200px',
        transition: '0.3s',
      }}
    >
      <HeaderStyle>
        <Stack
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          useFlexGap
          spacing={{ xs: 2, md: 3, lg: 6 }}
          sx={{
            width: '100%',
            maxWidth: '1080px',
          }}
        >
          <Link to={'/'}>
            <Logo color='#07264E' />
          </Link>
          <nav>
            <ul style={{ margin: 'unset' }}>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/sobre'>Sobre</NavLink>
              </li>
              <li>
                <NavLink to='/contato'>Contato</NavLink>
              </li>
              {user.data && (
                <li>
                  <NavLink
                    to={user.data?.isMember ? '/membros/guias' : '/plano'}
                  >
                    {user.data?.isMember ? 'Membros' : 'Assinar'}
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className='notGap' style={{ margin: 'unset' }}>
              {!user.data && (
                <>
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
                </>
              )}
              {user.data && (
                <>
                  <li className='not'>
                    <BadgeAvatars />
                  </li>
                  <li className='not'>
                    <Button
                      sx={{ textTransform: 'unset', p: '.55rem 1.3rem' }}
                      variant='contained'
                      color='secondary'
                      onClick={() => handleLogout(navigate)}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Stack>
      </HeaderStyle>
    </DesktopHeaderWrapper>
  );
}
