import BadgeAvatars from '../../BadgeAvatars';
import { Stack, Typography } from '@mui/material';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import AccountMenu from '../menu/AccountMenu';
import { motion } from 'framer-motion';

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
      )}
      <Stack alignItems={'center'} justifyContent={'center'} sx={menu}>
        {openMenu && <AccountMenu />}
        <motion.div
          onClick={() => setOpenMenu(!openMenu)}
          animate={{
            rotate: openMenu ? 0 : 180,
            x: openMenu ? 0 : '-14px',
            y: openMenu ? 0 : '-25px',
          }}
        >
          <AiOutlineArrowLeft />
        </motion.div>
      </Stack>
    </Stack>
  );
}
