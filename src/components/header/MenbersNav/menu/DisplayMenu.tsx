import React, { useState, useContext, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Stack } from '@mui/material';
import { BiSolidRightArrow } from 'react-icons/bi';
import { FaListAlt } from 'react-icons/fa';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import MainContext from '../../../../contexts/MainContext';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';

export default function DispLayMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { setIsList, setIsBlock } = useContext(MainContext);
  const { darkMode } = useContext(DarkModeContext);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseList = () => {
    setAnchorEl(null);
    localStorage.setItem('isList', 'true');
    localStorage.setItem('isBlock', 'false');
    setIsList(true);
    setIsBlock(false);
  };
  const handleCloseBlock = () => {
    setAnchorEl(null);
    localStorage.setItem('isList', 'false');
    localStorage.setItem('isBlock', 'true');
    setIsBlock(true);
    setIsList(false);
  };

  useEffect(() => {
    const storedIsList = localStorage.getItem('isList');
    const storedIsBlock = localStorage.getItem('isBlock');

    if (storedIsList === 'true') {
      setIsList(true);
      setIsBlock(false);
    }
    if (storedIsBlock === 'true') {
      setIsBlock(true);
      setIsList(false);
    }
  }, [setIsBlock, setIsList]);

  return (
    <Stack>
      <Button
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        className='signinBtn'
        variant='contained'
        sx={{
          borderRadius: '10px',
          mb: '.6rem',
          background: darkMode ? '#272727' : '#fff',
          border: '',
          color: darkMode ? '#fff' : '#222222d0',
          fontWeight: 'bold',
          justifyContent: 'start',
          '&:hover': { background: darkMode ? '#ffffff14' : '#98c5ff' },
          boxShadow: '1px 1px 10px rgba(0, 0, 0, .1)',
          zIndex: 99,
          textTransform: 'unset',
          fontSize: '1rem',
          '& svg': { width: '12px', height: '12px' },
        }}
      >
        <Stack direction={'row'} spacing={4} alignItems={'center'}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Stack>
              <BsFillGrid1X2Fill />
            </Stack>
            <span>Exibir</span>
          </Stack>
          <motion.span
            animate={{
              rotate: open ? '-90deg' : '90deg',
            }}
          >
            <BiSolidRightArrow />
          </motion.span>
        </Stack>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '5px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleCloseList}
          sx={{
            transition: 'all .2s',
            '&:hover': {
              background: darkMode ? '#ffffff14' : '#98c5ff',
              color: '#222',
            },
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            useFlexGap
            spacing={2}
            sx={{
              color: darkMode ? '#fff' : '#222222d0',
            }}
          >
            <FaListAlt /> Lista
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={handleCloseBlock}
          sx={{
            transition: 'all .2s',
            '&:hover': {
              background: darkMode ? '#ffffff14' : '#98c5ff',
              color: '#222',
            },
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            useFlexGap
            spacing={2}
            sx={{
              color: darkMode ? '#fff' : '#222222d0',
            }}
          >
            <HiMiniSquares2X2 />
            Blocos
          </Stack>
        </MenuItem>
      </Menu>
    </Stack>
  );
}
