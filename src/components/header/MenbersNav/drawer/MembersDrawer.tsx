import { DRAWER_WIDTH } from '../../../../layouts/MenbersLayout';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack } from '@mui/material';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsWechat } from 'react-icons/bs';
import { RiBook3Fill } from 'react-icons/ri';
import DrawerListItem from './DrawerListItem';
import SwitchTheme from '../switch/SwitchTheme';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface MembersDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const exitAnimation = {
  opacity: 0,
  x: -50,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MembersDrawer({
  open,
  handleDrawerClose,
}: MembersDrawerProps) {
  const theme = useTheme();

  const location = useLocation();
  return (
    <Drawer
      variant='permanent'
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#090E14',
          color: '#fff',
        },
      }}
    >
      <DrawerHeader>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={exitAnimation}
              style={{ width: '100%' }}
            >
              <HeaderMenu openMenu={open} />
            </motion.div>
          )}
        </AnimatePresence>
        {location.pathname.includes('forum') ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={exitAnimation}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HeaderMenu openMenu={open} isForum={true} />
          </motion.div>
        ) : (
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: 'inherit',
              transition: 'background 150ms',
              p: 1,
              '&:hover': {
                background: '#23262D',
              },
            }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider sx={{ background: '#ffffff29' }} />
      <Stack
        direction={'column'}
        justifyContent={'space-between'}
        minHeight={'calc(100vh - 66px)'}
      >
        <List>
          <AnimatePresence>
            {!open && !location.pathname.includes('forum') && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={exitAnimation}
                style={{ paddingBlock: '8px' }}
              >
                <HeaderMenu openMenu={open} />
              </motion.div>
            )}
          </AnimatePresence>

          <DrawerListItem
            text='Dashboard'
            open={open}
            icon={<BiSolidDashboard />}
            to='/membros/dashboard'
          />

          <DrawerListItem
            text='Guias'
            open={open}
            icon={<RiBook3Fill />}
            to='/membros/guias'
          />
          <DrawerListItem
            text='Chat'
            open={open}
            icon={<BsWechat />}
            to='/membros/forum'
          />
          <DrawerListItem
            text='Inicio'
            open={open}
            icon={<AiFillHome />}
            to='/'
          />
        </List>
        <div>
          <Divider sx={{ background: '#ffffff29' }} />
          <SwitchTheme openMenu={open} />
        </div>
      </Stack>
    </Drawer>
  );
}
