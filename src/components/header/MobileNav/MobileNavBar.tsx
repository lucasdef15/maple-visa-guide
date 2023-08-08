import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDimensions } from './use-dimensions';
import { MenuToggle } from './MenuToggle';
import Navigation from './Navigation';
import { useContext, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import MainContext from '../../../contexts/MainContext';
import { Stack } from '@mui/material';
import Logo from '../../logo/Logo';
import './mobileNav.css';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 220px 50px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 220px 50px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const MobileNav = styled(Stack)(() => ({
  width: '100%',
  justifyContent: 'center',
  paddingBlock: '1.5rem',
  background: '#f7f7f7dd',
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

export default function MobileNavBar() {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const { isOpen, toggleOpen, showHeader } = useContext(MainContext);

  const handleBodyClick = useCallback(
    (event: Event) => {
      const targetElement = event.target as Element;
      const isExcluded = targetElement.closest('.mobile-nav');

      if (isOpen && !isExcluded) {
        toggleOpen();
      } else {
        return;
      }
    },
    [isOpen, toggleOpen]
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
    <MobileNav
      sx={{
        display: { xs: 'flex', sm: 'none' },
        top: showHeader ? 0 : '-200px',
      }}
    >
      <Logo color='#07264E' />
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
        <Navigation isOpen={isOpen} />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </MobileNav>
  );
}
