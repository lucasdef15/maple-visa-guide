import { Stack, Typography } from '@mui/material';
import { BiHash } from 'react-icons/bi';

interface ChatWelcomeProps {
  name: string;
  type: 'channel' | 'conversation';
}

export default function ChatWelcome({ name, type }: ChatWelcomeProps) {
  return (
    <Stack sx={{ px: 3, py: 4 }}>
      {type === 'channel' && (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            height: 75,
            width: 75,
            borderRadius: '50%',
            fontSize: '3rem',
            color: (theme) => theme.palette.common.white,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgb(63 63 70)'
                : 'rgb(113 113 122)',
          }}
        >
          <BiHash />
        </Stack>
      )}
      <Typography
        fontWeight={'bold'}
        color={(theme) =>
          theme.palette.mode === 'dark' ? '#fff' : 'rgb(63 63 70)'
        }
        fontSize={25}
        sx={{ width: 'fit-content', marginTop: 1.5 }}
      >
        {type === 'channel' ? 'Welcome to #' : ''}
        {name}
      </Typography>
      <Typography
        color={(theme) => theme.palette.text.secondary}
        fontSize={16}
        sx={{ width: 'fit-content', marginTop: 1.5 }}
      >
        {type === 'channel'
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </Typography>
    </Stack>
  );
}
