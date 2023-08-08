import { motion } from 'framer-motion';
import MenuItem from './MenuItem';
import { Stack, Button } from '@mui/material';
import ModalComponent from '../../modal/Modal';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function Navigation({ isOpen }: any) {
  const { user, handleLogout } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <motion.ul
      variants={variants}
      style={{
        display: isOpen ? 'flex' : 'none',
        height: '100vh',
        transition: '.5s',
      }}
    >
      <MenuItem />
      <Stack
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          flex: '1 1 10%',
          height: '100%',
        }}
      >
        {!user.data && (
          <>
            <li>
              <ModalComponent
                text='Signup'
                variant='outlined'
                color='secondary'
              />
            </li>
            <li>
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
              <Button
                className='signinBtn'
                sx={{ textTransform: 'unset' }}
                variant='contained'
                color='secondary'
                onClick={() => handleLogout(navigate)}
              >
                Logout
              </Button>
            </li>
          </>
        )}
      </Stack>
    </motion.ul>
  );
}
