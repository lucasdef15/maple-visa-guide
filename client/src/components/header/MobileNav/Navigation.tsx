import { motion } from 'framer-motion';
import MenuItem from './MenuItem';
import { Stack, Button } from '@mui/material';
import { AiOutlineLogin } from 'react-icons/ai';
import { PiSignInBold } from 'react-icons/pi';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export default function Navigation({ isOpen }: any) {
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
        <li>
          <Button
            className='signinBtn'
            variant='contained'
            color='secondary'
            startIcon={<AiOutlineLogin />}
            sx={{ textTransform: 'none' }}
          >
            Login
          </Button>
        </li>
        <li>
          <Button
            className='signinBtn'
            variant='contained'
            color='secondary'
            startIcon={<PiSignInBold />}
            sx={{ textTransform: 'none' }}
          >
            Signin
          </Button>
        </li>
      </Stack>
    </motion.ul>
  );
}
