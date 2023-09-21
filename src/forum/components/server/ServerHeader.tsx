import { Typography, Skeleton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ServerWithMembersWithProfile } from '../../../../types';
import { MouseEvent, useContext, useState } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { LuUserPlus } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { useModal } from '../../hooks/use-modal-store';
import { motion } from 'framer-motion';
import { BiTrashAlt } from 'react-icons/bi';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: 'ADMIN' | 'GUEST' | 'MODERATOR';
  isLoading: boolean;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    sx={{ left: '-10px' }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 230,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ServerHeader({
  server,
  role,
  isLoading,
}: ServerHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { darkMode } = useContext(DarkModeContext);

  const { onOpen } = useModal();

  const isAdmin = role === 'ADMIN';
  const isModerator = isAdmin || role === 'MODERATOR';

  const handleInvitePeople = () => {
    onOpen('invite', { server });
    setAnchorEl(null);
  };
  const handleEditServer = () => {
    onOpen('editServer', { server });
    setAnchorEl(null);
  };
  const handleManageMembers = () => {
    onOpen('members', { server });
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          width: '100%',
          color: darkMode ? 'white' : '#222',
          borderRadius: '0 !important',
          textTransform: 'unset',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingInline: '.7rem',
          paddingBlock: '.4rem',
          paddingRight: '.9rem',
          borderBottom: darkMode ? '' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: darkMode ? '' : '1px 1px 10px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .05)',
          },
        }}
        disableElevation
        onClick={handleClick}
      >
        {isLoading ? (
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem', borderRadius: '5px' }}
            width={210}
          />
        ) : (
          <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {server?.name}
          </Typography>
        )}
        <motion.span
          animate={{
            rotate: open ? '-180deg' : '0deg',
            y: open ? -4 : 3,
          }}
        >
          <KeyboardArrowDownIcon />
        </motion.span>
      </Button>
      {darkMode ? <Divider /> : null}
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={isLoading ? false : open}
        onClose={handleClose}
      >
        {isModerator && (
          <MenuItem
            onClick={handleInvitePeople}
            disableRipple
            sx={{
              color: darkMode ? 'rgb(129 140 248)' : 'rgb(79 70 229)',
              justifyContent: 'space-between',
            }}
          >
            Invite People
            <LuUserPlus />
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem
            onClick={handleEditServer}
            disableRipple
            sx={{
              justifyContent: 'space-between',
            }}
          >
            Server Settings
            <AiOutlineSetting />
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem
            onClick={handleManageMembers}
            disableRipple
            sx={{
              justifyContent: 'space-between',
            }}
          >
            Manage Members
            <BsPeople />
          </MenuItem>
        )}
        {isModerator && (
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{
              justifyContent: 'space-between',
            }}
          >
            Create Channel
            <AiOutlinePlusCircle />
          </MenuItem>
        )}
        {isModerator && <Divider sx={{ my: 0.5 }} />}
        {isAdmin && (
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{
              color: 'rgb(244 63 94)',
              justifyContent: 'space-between',
            }}
          >
            Delete Server
            <BiTrashAlt />
          </MenuItem>
        )}
        {!isAdmin && (
          <MenuItem
            onClick={handleClose}
            disableRipple
            sx={{
              color: 'rgb(244 63 94)',
              justifyContent: 'space-between',
            }}
          >
            Leave Server
            <AiOutlineLogout />
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
}
