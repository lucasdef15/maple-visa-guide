import { Stack, Typography } from '@mui/material';
import Logo from '../../../logo/Logo';

const headerStyle = {
  padding: '1rem 2rem',
  background: '#ecececdd',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.103)',
  '& svg': {
    width: '115px',
  },
};

export default function LayoutHeader() {
  return (
    <Stack
      component={'header'}
      sx={headerStyle}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Stack>
        <Typography
          component={'h2'}
          sx={{ fontSize: '28px', fontweight: 'bold' }}
        >
          Guias / Manuais
        </Typography>
        <Typography
          color={'text.secondary'}
          sx={{ fontSize: '15px', fontweight: 'light' }}
        >
          Explore nossas postagens mais recentes e mantenha-se atualizado!
        </Typography>
      </Stack>
      <Logo color={'#222'} />
    </Stack>
  );
}
