import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsWechat } from 'react-icons/bs';
import { RiBook3Fill } from 'react-icons/ri';
import SwitchTheme from './switch/SwitchTheme';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import MainContext from '../../../contexts/MainContext';

const StyledLi = styled(Stack)(() => ({
  '&:not(.not)': {
    padding: '.7rem .5rem',
    borderRadius: '5px',
    '&:hover': {
      background: '#23262D',
    },
  },
  '& svg': {
    width: '20px',
    height: '20px',
  },
}));

export interface MenbersNavProps {
  openMenu: boolean;
}

export default function MenbersNav() {
  const { openMenu, setOpenMenu } = useContext(MainContext);

  return (
    <motion.div
      className='DesktopMenbersNavBar'
      style={{
        position: 'fixed',
        backgroundColor: '#090E14',
        height: '100vh',
        color: '#fff',
      }}
      initial={{ width: '5%' }}
      animate={{ width: openMenu ? '275px' : '76px' }}
      exit={{ width: '275px' }}
    >
      <Stack component={'nav'} sx={{ height: '100%' }}>
        <HeaderMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <Stack justifyContent={'space-between'} sx={{ height: '100%' }}>
          <Stack
            sx={{
              mt: '1.5rem',
              padding: '1rem',
              listStyle: 'none',
              fontSize: '18px',
            }}
            useFlexGap
            spacing={1}
          >
            <NavLink to='dashboard'>
              <StyledLi
                direction='row'
                alignItems='center'
                justifyContent={openMenu ? 'start' : 'center'}
                spacing={2}
                sx={{}}
              >
                <BiSolidDashboard />
                {openMenu && <span>Dashboard</span>}
              </StyledLi>
            </NavLink>
            <NavLink to='guias'>
              <StyledLi
                direction='row'
                alignItems='center'
                justifyContent={openMenu ? 'start' : 'center'}
                spacing={2}
                sx={{}}
              >
                <RiBook3Fill />
                {openMenu && <span>Guias</span>}
              </StyledLi>
            </NavLink>

            <NavLink to='forum'>
              <StyledLi
                direction='row'
                alignItems='center'
                justifyContent={openMenu ? 'start' : 'center'}
                spacing={2}
              >
                <BsWechat />
                {openMenu && <span>Chat</span>}
              </StyledLi>
            </NavLink>
            <NavLink to='/'>
              <StyledLi
                direction='row'
                alignItems='center'
                justifyContent={openMenu ? 'start' : 'center'}
                spacing={2}
              >
                <AiFillHome />
                {openMenu && <span>Pagina Inicial</span>}
              </StyledLi>
            </NavLink>
          </Stack>
          <Stack>
            <SwitchTheme openMenu={openMenu} />
          </Stack>
        </Stack>
      </Stack>
    </motion.div>
  );
}
