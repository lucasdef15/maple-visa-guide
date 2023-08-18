import { NavLink } from 'react-router-dom';
import { useState, useContext, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { RiBook3Fill } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import Loader from '../../../loaders/Loader';
import MainContext from '../../../../contexts/MainContext';

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

export default function CollapsibleMenu({ openMenu }: any) {
  const [openGuias, setOpenGuias] = useState(false);

  const { categories } = useContext(CategoryContext);
  const { darkMode } = useContext(DarkModeContext);
  const { handleOpen: handleOpenMobileNav } = useContext(MainContext);

  const handleOpen = () => {
    setOpenGuias(!openGuias);
  };

  const handleBodyClick = useCallback(
    (event: Event) => {
      const targetElement = event.target as Element;
      const isExcluded = targetElement.closest(
        '.css-122iqe9-MuiStack-root, .css-18mp3ih-MuiStack-root, .guiasName, .arrowGuiasAnimated'
      );

      if (openGuias && !isExcluded) {
        setOpenGuias(!openGuias);
      } else {
        return;
      }
    },
    [openGuias, setOpenGuias]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleBodyClick, {
        capture: true,
      });
    };
  }, [handleBodyClick]);

  return (
    <>
      <StyledMenu
        direction='row'
        alignItems='center'
        justifyContent={'space-between'}
        onClick={handleOpen}
        sx={{
          background: openGuias ? '#252A31' : '',
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={'center'}
          spacing={2}
          sx={{
            '& svg': { position: 'relative', left: openMenu ? 0 : '3px' },
          }}
        >
          <RiBook3Fill />
          {openMenu && <span className='guiasName'>Guias</span>}
        </Stack>
        <motion.div
          className='arrowGuiasAnimated'
          style={{ cursor: 'pointer' }}
          animate={{
            rotate: openGuias ? -180 : 0,
            y: openGuias ? -2 : openMenu ? 0 : 3.5,
            x:
              (openGuias === true && openMenu === false) ||
              (openGuias === false && openMenu === false)
                ? -100
                : 0,
          }}
        >
          <MdKeyboardArrowDown />
        </motion.div>
      </StyledMenu>
      <AnimatePresence>
        {openGuias ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: openMenu ? 0 : 50,
              x: openMenu ? 0 : 65,
            }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.3rem',
              position: openMenu ? 'relative' : 'absolute',
              background: openMenu
                ? '#090e14'
                : darkMode
                ? '#121212'
                : '#23262d',
              minWidth: '243px',
              borderRadius: '5px',
              margin: 0,
              padding: 0,
            }}
          >
            <NavLink to='guias' onClick={handleOpenMobileNav}>
              <Stack
                direction='row'
                alignItems='center'
                spacing={2}
                sx={{
                  padding: '.7rem .5rem',
                  borderRadius: '5px',
                  cursor: 'poitner',
                  '&:hover': {
                    background: openMenu
                      ? '#23262D'
                      : darkMode
                      ? '#252525'
                      : '#090e14',
                  },
                }}
              >
                <GoDotFill />
                <span>Todos</span>
              </Stack>
            </NavLink>
            {categories.length ? (
              categories.map((category) => (
                <NavLink
                  key={category.categoryID}
                  to={`/membros/guias?categoryID=${category.categoryID}`}
                  onClick={handleOpenMobileNav}
                >
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    sx={{
                      padding: '.7rem .5rem',
                      borderRadius: '5px',
                      cursor: 'poitner',
                      '&:hover': {
                        background: openMenu
                          ? '#23262D'
                          : darkMode
                          ? '#252525'
                          : '#090e14',
                      },
                    }}
                  >
                    <GoDotFill />
                    <span>{category.name}</span>
                  </Stack>
                </NavLink>
              ))
            ) : (
              <Loader />
            )}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </>
  );
}
