import { AppBar, Drawer, Stack, Typography } from '@mui/material';
import { BiHash } from 'react-icons/bi';
import { AiOutlineAudio } from 'react-icons/ai';
import { LuVideo } from 'react-icons/lu';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MobileToggle from '../toggles/MobileToggle';
import NavigationSidebar from '../sidebar/NavigationSidebar';
import ServerSidebar from '../server/ServerSidebar';
import { useState } from 'react';

interface ChatHeaderProps {
  serverId: string | undefined;
  name: string | undefined;
  type: 'channel' | 'conversation';
  imageUrl?: string | undefined;
}

const drawerWidth = 280;

export default function ChatHeader({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
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
            </Stack>
          )}
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
          <NavigationSidebar mobile={true} />
        </Stack>
        <ServerSidebar mobile={true} />
      </Drawer>
    </Box>
  );
}
