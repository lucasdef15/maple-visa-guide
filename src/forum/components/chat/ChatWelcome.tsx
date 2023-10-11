import { Skeleton, Stack, Typography } from '@mui/material';
import { BiHash } from 'react-icons/bi';

interface ChatWelcomeProps {
  name: string;
  type: 'channel' | 'conversation';
  isChannelLoading: boolean;
  isConversationLoading?: boolean;
}

export default function ChatWelcome({
  name,
  type,
  isChannelLoading,
  isConversationLoading,
}: ChatWelcomeProps) {
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
      {isChannelLoading || isConversationLoading ? (
        <Skeleton
          variant='text'
          sx={{
            fontSize: '2.6rem',
            borderRadius: '5px',
            background: (theme) =>
              theme.palette.mode === 'dark' ? '#ffffff4b' : '#0000004e',
          }}
          width={510}
        />
      ) : (
        <Typography
          fontWeight={'bold'}
          color={(theme) =>
            theme.palette.mode === 'dark' ? '#fff' : 'rgb(63 63 70)'
          }
          fontSize={25}
          sx={{ width: 'fit-content', marginTop: 1.5 }}
        >
          {type === 'channel' ? 'Welcome to #' : ''}
          {name ? name : ''}
        </Typography>
      )}

      <Typography
        color={(theme) => theme.palette.text.secondary}
        fontSize={16}
        sx={{ width: 'fit-content', marginTop: 1.5 }}
      >
        {type === 'channel'
          ? `This is the start of the #${name ? name : ''} channel.`
          : `This is the start of your conversation with ${name ? name : ''}`}
      </Typography>
    </Stack>
  );
}
