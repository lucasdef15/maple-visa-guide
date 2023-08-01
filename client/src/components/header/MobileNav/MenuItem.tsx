import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import BadgeAvatars from '../BadgeAvatars';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

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
  return (
    <div className='ul-wrapper' style={{ transition: '.5s' }}>
      <StyledLi>
        <BadgeAvatars />
        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>Jim Person</Typography>
      </StyledLi>

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

      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavLink to='/assinantes'>Assinar</NavLink>
      </motion.li>
    </div>
  );
}
