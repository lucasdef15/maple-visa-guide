import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import qs from 'query-string';
import {
  IconButton,
  Stack,
  DialogContentText,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import { useModal } from '../../hooks/use-modal-store';
import { alpha, styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import axios from 'axios';
import config from '../../../utilities/config';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { Member } from '../../../../types';
import UserAvatar from '../avatars/UserAvatar';
import { BsShieldFillCheck } from 'react-icons/bs';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { BsFillShieldFill } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Menu, { MenuProps } from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FaGavel } from 'react-icons/fa';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingInline: theme.spacing(5),
    paddingBottom: theme.spacing(0.5),
  },
  '& .MuiPaper-root': {
    maxWidth: '550px',
    borderRadius: '15px',
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
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
    borderRadius: '10px',
    marginTop: theme.spacing(1),
    minWidth: 180,
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

interface RoleIconMapProps {
  [key: string]: null | string | JSX.Element;
}

const roleIconMap: RoleIconMapProps = {
  GUEST: null,
  MODERATOR: <BsShieldFillCheck style={{ color: '#4f46e5' }} />,
  ADMIN: <BsShieldFillExclamation style={{ color: '#f43f5e' }} />,
};

export default function MembersModal() {
  const { darkMode } = useContext(DarkModeContext);

  const [loadingId, setLoadingId] = useState('');
  const [openSub, setOpenSub] = useState(false);
  const [anchorElMap, setAnchorElMap] = useState<
    Record<string, HTMLElement | null>
  >({});

  const { isOpen, onClose, type, data, onOpen } = useModal();

  const { server } = data;

  const isModalOpen = isOpen && type === 'members';

  const handleClickMenu = (
    memberId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [memberId]: event.currentTarget,
    }));
  };
  const handleClose = (memberId: string) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [memberId]: null,
    }));
  };

  const handleClick = () => {
    setOpenSub(!openSub);
  };

  const onRoleChange = async (memberId: string, role: string) => {
    handleClose(memberId);
    setOpenSub(false);
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `${config.APP_BASE_URL}/member/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      onOpen('members', { server: response.data.server });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId('');
    }
  };

  const onKick = async (memberId: string) => {
    handleClose(memberId);
    setOpenSub(false);
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `${config.APP_BASE_URL}/member/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      onOpen('members', { server: response.data.server });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId('');
    }
  };

  return (
    <div>
      <AnimatePresence>
        <BootstrapDialog
          aria-labelledby='customized-dialog-title'
          open={isModalOpen}
          onClose={onClose}
        >
          <IconButton
            aria-label='delete'
            onClick={onClose}
            sx={{ position: 'absolute', right: 5, top: 5 }}
          >
            <AiOutlineClose />
          </IconButton>
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              pt: 3,
              pb: 0,
            }}
            id='customized-dialog-title'
          >
            Manage Members
          </DialogTitle>
          <DialogContentText sx={{ textAlign: 'center' }}>
            {server?.members?.length} Members
          </DialogContentText>
          <DialogContent sx={{ mb: 2.5, width: '100%', maxHeight: '420px' }}>
            {server?.members?.map((member: Member) => (
              <Stack
                key={member.id}
                direction={'row'}
                alignItems={'center'}
                useFlexGap
                spacing={1.5}
                sx={{ mb: 3, minWidth: '370px' }}
              >
                <UserAvatar
                  src={member?.profile?.imageUrl}
                  name={member.profile.name}
                />
                <Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    useFlexGap
                    spacing={1.5}
                  >
                    <Typography fontWeight={'bold'} fontSize={'1rem'}>
                      {member?.profile.name}
                    </Typography>
                    <span>{roleIconMap[member.role]}</span>
                  </Stack>
                  <Typography color={'text.secondary'} fontSize={'.8rem'}>
                    {member.profile.email}
                  </Typography>
                </Stack>
                {loadingId === member.id ? (
                  <Stack sx={{ ml: 'auto' }}>
                    <CircularProgress
                      variant='indeterminate'
                      sx={{
                        color: darkMode ? '#fff' : '',
                      }}
                      size={20}
                      thickness={2}
                      value={100}
                    />
                  </Stack>
                ) : (
                  server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <Stack sx={{ ml: 'auto' }}>
                      <IconButton
                        aria-label='more'
                        id='long-button'
                        aria-controls={
                          anchorElMap[member.id] ? 'long-menu' : undefined
                        }
                        aria-expanded={
                          anchorElMap[member.id] ? 'true' : undefined
                        }
                        aria-haspopup='true'
                        onClick={(event) => handleClickMenu(member.id, event)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <StyledMenu
                        id='long-menu'
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorElMap[member.id]}
                        open={Boolean(anchorElMap[member.id])}
                        onClose={() => handleClose(member.id)}
                      >
                        <ListItemButton onClick={handleClick}>
                          <ListItemIcon
                            sx={{
                              minWidth: 'unset',
                              pr: 2,
                            }}
                          >
                            <BsShieldFillExclamation />
                          </ListItemIcon>
                          <ListItemText primary='Role' />
                          {openSub ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSub} timeout='auto' unmountOnExit>
                          <List component='div' disablePadding>
                            <ListItemButton
                              onClick={() => onRoleChange(member.id, 'GUEST')}
                              sx={{ pl: 4, py: 0.3 }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 'unset',
                                  pr: 2,
                                }}
                              >
                                <BsFillShieldFill />
                              </ListItemIcon>
                              <ListItemText primary='Guest' />
                              {member.role === 'GUEST' && (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 'unset',
                                    ml: 'auto',
                                    color: 'rgb(34 197 94)',
                                  }}
                                >
                                  <BsFillCheckCircleFill />
                                </ListItemIcon>
                              )}
                            </ListItemButton>
                            <ListItemButton
                              onClick={() =>
                                onRoleChange(member.id, 'MODERATOR')
                              }
                              sx={{ pl: 4, py: 0.3 }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 'unset',
                                  pr: 2,
                                  color: '#4f46e5',
                                }}
                              >
                                <BsShieldFillCheck />
                              </ListItemIcon>
                              <ListItemText
                                primary='Moderator'
                                sx={{ pr: 2 }}
                              />
                              {member.role === 'MODERATOR' && (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 'unset',
                                    ml: 'auto',
                                    color: 'rgb(34 197 94)',
                                  }}
                                >
                                  <BsFillCheckCircleFill />
                                </ListItemIcon>
                              )}
                            </ListItemButton>
                          </List>
                        </Collapse>
                        <Divider />
                        <ListItemButton onClick={() => onKick(member.id)}>
                          <ListItemIcon
                            sx={{
                              minWidth: 'unset',
                              pr: 2,
                              color: '#f43f5e',
                            }}
                          >
                            <FaGavel />
                          </ListItemIcon>
                          <ListItemText
                            primary='Kick'
                            sx={{
                              color: '#f43f5e',
                            }}
                          />
                        </ListItemButton>
                      </StyledMenu>
                    </Stack>
                  )
                )}
              </Stack>
            ))}
          </DialogContent>
        </BootstrapDialog>
      </AnimatePresence>
    </div>
  );
}
