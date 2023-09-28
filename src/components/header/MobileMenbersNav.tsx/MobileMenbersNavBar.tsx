import { motion } from 'framer-motion';
import { useDimensions } from '../MobileNav/use-dimensions';
import { MenuToggle } from './MenuToggle';
import Navigation from './Navigation';
import { useContext, useEffect, useCallback, useRef } from 'react';
import { styled } from '@mui/material/styles';
import MainContext from '../../../contexts/MainContext';
import Logo from '../../logo/Logo';
import './MenbersStyle.css';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 252px 42px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 252px 42px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function MobileMenbersNavBar() {
  const containerRef = useRef(null);

  const { height } = useDimensions(containerRef);

  const { isOpen, showHeader, handleOpen } = useContext(MainContext);
  const { darkMode } = useContext(DarkModeContext);

  const MobileNav = styled(Stack)(() => ({
    width: '100%',
    justifyContent: 'center',
    paddingBlock: '1.5rem',
    background: darkMode ? '#222222' : '#f7f7f7f7',
    boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.137)',
    transition: 'top 0.3s',
    paddingInline: '1rem',
    alignItems: 'start',
    zIndex: 999,
    position: 'fixed',
    right: 0,
    top: 0,

    '& svg': {
      maxWidth: '150px',
    },
  }));

  const handleBodyClick = useCallback(
    (event: Event) => {
      const targetElement = event.target as Element;
      const isExcluded = targetElement.closest('.mobile-nav');

      if (isOpen && !isExcluded) {
        handleOpen();
      } else {
        return;
      }
    },
    [handleOpen, isOpen]
  );

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', handleBodyClick, {
        capture: true,
      });
    };
  }, [handleBodyClick]);

  const location = useLocation();

  return (
    <MobileNav
      sx={{
        display: {
          xs: location.pathname.includes('forum') ? 'none' : 'flex',
          sm: 'none',
        },
        top: showHeader ? 0 : '-200px',
      }}
    >
      <Logo color={darkMode ? '#fff' : '#07264E'} />
      <motion.nav
        style={{
          top: showHeader ? 0 : isOpen ? 0 : '-200px',
          transition: 'top 0.3s',
        }}
        className='mobile-nav'
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
      >
        <motion.div className='mobile-background' variants={sidebar} />
        <Navigation isOpen={isOpen} handleOpen={handleOpen} />
        <MenuToggle toggle={() => handleOpen()} />
      </motion.nav>
    </MobileNav>
  );
}
