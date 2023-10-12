import { Stack, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import AccountMenu from '../accountMenu/AccountMenu';

interface HeaderMenuProps {
  openMenu: boolean;
  isForum?: boolean;
}

export default function HeaderMenu({ openMenu }: HeaderMenuProps) {
  const { user } = useContext(UserContext);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent={openMenu ? 'start' : 'center'}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <AccountMenu />
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
