import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import BadgeAvatars from '../BadgeAvatars';
import { styled } from '@mui/material/styles';
import { Typography, Stack } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const StyledLi = styled('li')(() => ({
  justifyContent: 'start !important',
  flexDirection: 'column',
  alignItems: 'start !important',
  width: '100%',
  paddingBottom: '20px !important',
  borderBottom: '1px solid #39393946',
  marginBottom: '1rem !important',
  gap: '0 !important',
  transition: '.5s',
}));

export default function MenuItem() {
  const { user } = useContext(UserContext);

  return (
    <Stack
      className='ul-wrapper'
      sx={{ transition: '.5s', mt: user.data ? 0 : 20 }}
    >
      {user.data && (
        <StyledLi>
          <BadgeAvatars />
          <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
            {user.data.name}
          </Typography>
        </StyledLi>
      )}

      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink to='/'>Home</NavLink>
      </motion.li>

      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink to='/sobre'>Sobre</NavLink>
      </motion.li>

      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink to='/contato'>Contato</NavLink>
      </motion.li>

      {user.data && (
        <motion.li
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to='/Membros'>Membros</NavLink>
        </motion.li>
      )}
    </Stack>
  );
}
