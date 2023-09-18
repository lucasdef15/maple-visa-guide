import { Stack, MouseEvent, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ServerWithMembersWithProfile } from '../../../../types';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { LuUserPlus } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineLogout } from 'react-icons/ai';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: 'ADMIN' | 'GUEST' | 'MODERATOR';
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

export default function ServerHeader({ server, role }: ServerHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { darkMode } = useContext(DarkModeContext);

  const isAdmin = role === 'ADMIN';
  const isModerator = isAdmin || role === 'MODERATOR';

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
          justifyContent: 'space-between',
          paddingInline: '.7rem',
          paddingBlock: '.6rem',
          borderBottom: '2px solid #222222c1',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .05)',
          },
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {server?.name}
        </Typography>
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {isModerator && (
          <MenuItem
            onClick={handleClose}
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
            onClick={handleClose}
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
            onClick={handleClose}
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
