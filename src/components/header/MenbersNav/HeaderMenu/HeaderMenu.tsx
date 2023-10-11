import BadgeAvatars from '../../BadgeAvatars';
import { Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

export default function HeaderMenu({ openMenu }: any) {
  const { user } = useContext(UserContext);

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={3}
      sx={{ width: '100%', px: 1 }}
    >
      <BadgeAvatars />
      {openMenu && (
        <Stack>
          <Typography sx={{ fontSize: '1rem' }}>{user?.data?.name}</Typography>
          <Typography
            sx={{
              fontSize:
                (user?.data?.email.length as number) > 21 ? '.7rem' : '.85rem',
              fontWeight: 'light',
              color: 'text.light',
            }}
          >
            {(user?.data?.email.length as number) > 21
              ? user?.data?.email.slice(0, 21) + '...'
              : user?.data?.email}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
