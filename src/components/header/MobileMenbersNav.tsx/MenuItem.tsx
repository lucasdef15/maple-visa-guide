import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BadgeAvatars from '../BadgeAvatars';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import AccountMenu from '../MenbersNav/menu/AccountMenu';
import MainContext from '../../../contexts/MainContext';
import CollapsibleMenu from '../MenbersNav/CollapsibleMenu/CollapsibleMenu';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsWechat } from 'react-icons/bs';
import SwitchTheme from '../MenbersNav/switch/SwitchTheme';
import { Stack, Typography, Button } from '@mui/material';
import { RiBookletFill } from 'react-icons/ri';

const StyledLi = styled(Stack)(() => ({
  '&:not(.not)': {
    padding: '.7rem .5rem',
    borderRadius: '5px',
    '&:hover': {
      background: '#23262d',
    },
  },
  '& svg': {
    width: '20px',
    height: '20px',
  },
}));

export default function MenuItem() {
  const { user, isAdmin } = useContext(UserContext);
  const { openMenu } = useContext(MainContext);

  return (
    <Stack
      className='ul-wrapper'
      sx={{
        transition: '.5s',
        mt: user.data ? 0 : 20,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {user.data && (
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            mt: '1rem',
            borderBottom: '1px solid #c1c1c1',
            paddingBottom: '2rem',
          }}
        >
          <BadgeAvatars />
          <Stack sx={{ color: 'white' }}>
            <Typography sx={{ fontSize: '1rem' }}>
              {user?.data?.name}
            </Typography>
            <Typography
              sx={{
                fontSize:
                  (user?.data?.email.length as number) >= 21
                    ? '.7rem'
                    : '.85rem',
                fontWeight: 'light',
                color: 'text.light',
              }}
            >
              {(user?.data?.email.length as number) >= 21
                ? user?.data?.email.slice(0, 21) + '...'
                : user?.data?.email}
            </Typography>
          </Stack>
          <motion.div animate={{ y: 11 }}>
            <AccountMenu />
          </motion.div>
        </Stack>
      )}

      <Stack
        component={'nav'}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <Stack
          justifyContent={'space-between'}
          sx={{ height: '100%', width: '100%' }}
        >
          <Stack
            sx={{
              listStyle: 'none',
              fontSize: '18px',
              width: '100%',
              color: 'white',
            }}
            useFlexGap
            direction={'column'}
            justifyContent={'start'}
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
                <span>Dashboard</span>
              </StyledLi>
            </NavLink>
            <CollapsibleMenu openMenu={openMenu} />
            <NavLink to='forum'>
              <StyledLi
                direction='row'
                alignItems='center'
                justifyContent={openMenu ? 'start' : 'center'}
                spacing={2}
              >
                <BsWechat />
                <span>Chat</span>
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
                <span>Pagina Inicial</span>
              </StyledLi>
            </NavLink>
          </Stack>
          {isAdmin && (
            <Link to={'guias/write'}>
              <Button
                className='signinBtn'
                variant='contained'
                size='small'
                endIcon={<RiBookletFill />}
                sx={{
                  background: '#44b700',
                  py: '.5rem',
                  '&:hover': { background: 'limegreen' },
                  whiteSpace: 'nowrap',
                  fontSize: '13px',
                  color: '#fff',
                }}
              >
                New post
              </Button>
            </Link>
          )}
          <Stack>
            <SwitchTheme openMenu={openMenu} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
