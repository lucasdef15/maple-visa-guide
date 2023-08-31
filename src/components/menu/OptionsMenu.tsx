import Navigation from './Navigation';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import config from '../../utilities/config';
import { BiSolidRightArrow } from 'react-icons/bi';
import { BsFilterLeft } from 'react-icons/bs';
import './style.css';

export interface Category {
  id: number;
  parent_id: number;
  name: string;
  children: Category[];
}

export default function OptionsMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const variants = {
    open: { opacity: 1, x: '0' },
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { y: { duration: 1 }, opacity: { duration: 0.2 } },
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.APP_BASE_URL}/cats`);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenOtions = () => {
    setOpenOptions((prevOpenOptions) => !prevOpenOptions);
  };

  const handleBodyClick = useCallback(
    (event: Event) => {
      const targetElement = event.target as Element;
      const isExcluded = targetElement.closest(
        '.main-nav, .header-nav-options, .parent_root, .sub-menu-ul, .position, .sub-menu-options, .css-sa5cp1-MuiButtonBase-root-MuiButton-root, .MuiButtonBase-root'
      );

      if (openOptions && !isExcluded) {
        setOpenOptions(!openOptions);
      } else {
        return;
      }
    },
    [openOptions]
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
    <div>
      <Button
        variant='contained'
        onClick={handleOpenOtions}
        sx={{
          borderRadius: '10px',
          minWidth: '225px',
          mb: '.6rem',
          background: openOptions ? '#98c5ffd0' : '#fff',
          border: openOptions ? '1px solid rgba(128, 128, 128, 0.295)' : '',
          color: '#222',
          justifyContent: 'start',
          '&:hover': { background: '#98c5ff' },
          boxShadow: '1px 1px 10px rgba(0, 0, 0, .1)',
          zIndex: 99,
          textTransform: 'unset',
        }}
      >
        <Stack
          component={'span'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            '& svg': { width: '12px', height: '12px' },
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            useFlexGap
            spacing={2}
            sx={{ '& svg': { width: '20px', height: '20px' } }}
          >
            <BsFilterLeft />
            Filtrar
          </Stack>
          <motion.span
            animate={{
              rotate: openOptions ? '-90deg' : '90deg',
            }}
          >
            <BiSolidRightArrow />
          </motion.span>
        </Stack>
      </Button>
      <motion.div
        className='filter_body'
        variants={variants}
        animate={openOptions ? 'open' : 'closed'}
      >
        <Navigation
          categories={categories}
          openOptions={openOptions}
          setOpenOptions={setOpenOptions}
        />
      </motion.div>
    </div>
  );
}