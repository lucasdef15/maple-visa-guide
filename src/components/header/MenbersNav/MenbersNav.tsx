import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsWechat } from 'react-icons/bs';
import SwitchTheme from './switch/SwitchTheme';
import CollapsibleMenu from './CollapsibleMenu/CollapsibleMenu';
import HeaderMenu from './HeaderMenu/HeaderMenu';

const styledHeader = {
  backgroundColor: '#090E14',
  width: '18%',
  minWidth: '250px',
  color: '#fff',
};
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

export default function MenbersNav() {
  return (
    <Stack component='header' sx={styledHeader}>
      <Stack component={'nav'} sx={{ height: '100%' }}>
        <HeaderMenu />
        <Stack justifyContent={'space-between'} sx={{ height: '100%' }}>
          <Stack
            sx={{
              mt: '1rem',
              padding: '1rem',
              listStyle: 'none',
              fontSize: '18px',
            }}
            useFlexGap
            spacing={1}
          >
            <StyledLi direction='row' alignItems='center' spacing={2}>
              <BiSolidDashboard />
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </StyledLi>
            <CollapsibleMenu />
            <StyledLi direction='row' alignItems='center' spacing={2}>
              <BsWechat />
              <NavLink to='/chat'>Chat</NavLink>
            </StyledLi>
            <StyledLi direction='row' alignItems='center' spacing={2}>
              <AiFillHome />
              <NavLink to='/'>Pagina Inicial</NavLink>
            </StyledLi>
          </Stack>
          <Stack>
            <SwitchTheme />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
