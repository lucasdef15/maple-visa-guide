import { motion } from 'framer-motion';
import { useDimensions } from '../MobileNav/use-dimensions';
import { MenuToggle } from './MenuToggle';
import Navigation from './Navigation';
import { useContext, useEffect, useCallback, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import MainContext from '../../../contexts/MainContext';
import Logo from '../../logo/Logo';
import './MenbersStyle.css';
import { CategoryContext } from '../../../contexts/CategoryContext';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { useLocation } from 'react-router-dom';
import { PostProps } from '../MenbersNav/LayoutHeader/LayoutHeader';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';

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

  const location = useLocation();

  const [post, setPost] = useState<PostProps>({
    name: '',
    img: '',
    id: 0,
    title: '',
    desc: '',
    date: 0,
    userImg: '',
    categoryID: 0,
  });

  const { height } = useDimensions(containerRef);

  const { isOpen, showHeader, handleOpen } = useContext(MainContext);
  const { categories } = useContext(CategoryContext);
  const { darkMode } = useContext(DarkModeContext);

  const catId: number = Number(location.search.split('=')[1]);

  const category = categories.find((cat) => cat.categoryID === catId);

  const postId = location.pathname.split('/')[3];

  let PostCategory;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8080/posts/${postId}`
        );
        setPost(response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  if (postId && post) {
    PostCategory = categories.find((cat) => cat.categoryID === post.categoryID);
  }

  const breadCrumbs = `${
    location.pathname.includes('guias') ? 'Guias' : ''
  } \\ ${
    category?.name ? category?.name : PostCategory ? PostCategory.name : 'Todos'
  }`;

  return (
    <MobileNav
      sx={{
        display: { xs: 'flex', sm: 'none' },
        top: showHeader ? 0 : '-200px',
      }}
    >
      <Logo color={darkMode ? '#fff' : '#07264E'} />
      <Stack
        sx={{ mt: '1rem', width: '100%' }}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Typography
          component={'h2'}
          sx={{
            fontSize: '20px',
            fontweight: 'bold',
            color: darkMode ? '#fff' : '',
          }}
        >
          {breadCrumbs}
        </Typography>
      </Stack>
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
        <MenuToggle toggle={() => handleOpen()} />
      </motion.nav>
    </MobileNav>
  );
}
