import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { RiBook3Fill } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const StyledMenu = styled(Stack)(() => ({
  position: 'relative',
  padding: '.7rem .5rem',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background .2s easy-in-out',
  '&:hover': {
    background: '#23262D',
  },
  '& svg': {
    width: '20px',
    height: '20px',
  },
}));

const menuItem = {
  padding: '.7rem .5rem',
  borderRadius: '5px',
  cursor: 'poitner',
  '&:hover': {
    background: '#23262D',
  },
};

export default function CollapsibleMenu() {
  const [openGuias, setOpenGuias] = useState(false);

  const handleOpen = () => {
    setOpenGuias(!openGuias);
  };

  return (
    <>
      <StyledMenu
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        onClick={handleOpen}
        sx={{
          background: openGuias ? '#252A31' : '',
        }}
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <RiBook3Fill />
          <span>Guias</span>
        </Stack>
        <motion.div
          style={{ cursor: 'pointer' }}
          animate={{
            rotate: openGuias ? -180 : 0,
            y: openGuias ? -2 : 0,
          }}
        >
          <MdKeyboardArrowDown />
        </motion.div>
      </StyledMenu>
      <AnimatePresence>
        {openGuias ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.3rem',
              position: 'relative',
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={2}
              sx={menuItem}
            >
              <GoDotFill />
              <NavLink to='/guias'>Todos</NavLink>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              spacing={2}
              sx={menuItem}
            >
              <GoDotFill />
              <NavLink to='/guias'>Manuais</NavLink>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              spacing={2}
              sx={menuItem}
            >
              <GoDotFill />
              <NavLink to='/guias'>Primeiros Passos</NavLink>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              spacing={2}
              sx={menuItem}
            >
              <GoDotFill />
              <NavLink to='/guias'>Tipos de Vistos</NavLink>
            </Stack>
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </>
  );
}
