import BadgeAvatars from '../../BadgeAvatars';
import { Stack, Typography } from '@mui/material';
import AccountMenu from '../menu/AccountMenu';

const styledUserInfo = {
  backgroundColor: '#23262D',
  padding: '1rem',
};

export default function HeaderMenu() {
  return (
    <Stack
      sx={styledUserInfo}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={2}
    >
      <BadgeAvatars />
      <Stack>
        <Typography sx={{ fontSize: '1rem' }}>Amelia Laurent</Typography>
        <Typography
          sx={{
            fontSize: '.8rem',
            fontWeight: 'light',
            color: 'text.light',
          }}
        >
          amelia@outlook.com
        </Typography>
      </Stack>
      <AccountMenu />
    </Stack>
  );
}
