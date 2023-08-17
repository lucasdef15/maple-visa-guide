import BadgeAvatars from '../../BadgeAvatars';
import { Stack, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import AccountMenu from '../menu/AccountMenu';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

const styledUserInfo = {
  backgroundColor: '#23262D',
  padding: '1rem',
};

const menu = {
  '& svg': {
    cursor: 'pointer',
    color: '#fff',
  },
};

export default function HeaderMenu({ openMenu, setOpenMenu }: any) {
  const { user } = useContext(UserContext);

  return (
    <Stack
      sx={styledUserInfo}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={2}
    >
      <BadgeAvatars />
      {openMenu && (
        <Stack>
          <Typography sx={{ fontSize: '1rem' }}>{user?.data?.name}</Typography>
          <Typography
            sx={{
              fontSize:
                (user?.data?.email.length as number) >= 21 ? '.7rem' : '.85rem',
              fontWeight: 'light',
              color: 'text.light',
            }}
          >
            {(user?.data?.email.length as number) >= 21
              ? user?.data?.email.slice(0, 21) + '...'
              : user?.data?.email}
          </Typography>
        </Stack>
      )}
      <Stack alignItems={'center'} justifyContent={'center'} sx={menu}>
        {openMenu && <AccountMenu />}
        <motion.div
          onClick={() => setOpenMenu(!openMenu)}
          animate={{
            rotate: openMenu ? 0 : 180,
            x: openMenu ? 0 : '-45px',
            y: openMenu ? 0 : 'calc(100vh - 110px)',
          }}
        >
          <AiOutlineArrowLeft />
        </motion.div>
      </Stack>
    </Stack>
  );
}
