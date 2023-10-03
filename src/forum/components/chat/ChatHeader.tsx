import { AppBar, Drawer, Stack, Typography } from '@mui/material';
import { BiHash } from 'react-icons/bi';
import { AiOutlineAudio } from 'react-icons/ai';
import { LuVideo } from 'react-icons/lu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MobileToggle from '../toggles/MobileToggle';
import NavigationSidebar from '../sidebar/NavigationSidebar';
import ServerSidebar from '../server/ServerSidebar';
import { memo, useState } from 'react';
import _ from 'lodash';
import UserAvatar from '../avatars/UserAvatar';
import SocketIndicator from '../badges/SocketIndicator';

interface ChatHeaderProps {
  serverId: string | undefined;
  name: string | undefined;
  type: 'channel' | 'conversation';
  imageUrl?: string | undefined;
}

const drawerWidth = 335;

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <MobileToggle open={open} handleClick={handleClick} />
          {type === 'channel' && (
            <Stack
              direction={'row'}
              alignItems={'center'}
              useFlexGap
              spacing={2}
              sx={{
                fontSize: '1.8rem',
                color: (theme) =>
                  theme.palette.mode == 'dark'
                    ? theme.palette.text.secondary
                    : theme.palette.common.white,
              }}
            >
              <BiHash />
            </Stack>
          )}
          {type === 'conversation' && (
            <UserAvatar src={imageUrl} name={name} className={{ mr: 2 }} />
          )}
          <Typography
            fontSize={'1.5rem'}
            fontWeight={600}
            variant='h6'
            component='div'
            color={(theme) => theme.palette.common.white}
            sx={{ flexGrow: 1 }}
          >
            {name}
          </Typography>
          <div>
            <SocketIndicator />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={open}
        onClose={handleClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
          },
        }}
      >
        <Stack sx={{ width: '72px' }}>
          <NavigationSidebar />
        </Stack>
        <ServerSidebar />
      </Drawer>
    </Box>
  );
};

const ChatHeaderMemo = memo(ChatHeader, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});

export default ChatHeaderMemo;