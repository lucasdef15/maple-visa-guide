import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDimensions } from './use-dimensions';
import { MenuToggle } from './MenuToggle';
import Navigation from './Navigation';
import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import MainContext from '../../../contexts/MainContext';
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

export default function MobileNavBar() {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const [, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  const { isOpen, toggleOpen } = useContext(MainContext);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || window.pageYOffset;
      setScrollPosition(position);

      setShowHeader(position < lastScrollPosition);
      setLastScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

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
  );
}
