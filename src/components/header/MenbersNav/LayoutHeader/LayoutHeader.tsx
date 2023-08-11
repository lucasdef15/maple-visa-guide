import { Stack, Typography, Button } from '@mui/material';
import { RiBookletFill } from 'react-icons/ri';
import Logo from '../../../logo/Logo';
import { Link } from 'react-router-dom';

const headerStyle = {
  padding: '1rem 2rem',
  background: '#ecececdd',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.103)',
  '& .logo': {
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
      <Stack direction={'row'} spacing={3.5} alignItems={'center'}>
        <Link to={'guias/write'}>
          <Button
            variant='contained'
            endIcon={<RiBookletFill />}
            sx={{
              background: '#44b700',
              py: '.5rem',
              '&:hover': { background: 'limegreen' },
            }}
          >
            New post
          </Button>
        </Link>
        <span className='logo'>
          <Logo color={'#222'} />
        </span>
      </Stack>
    </Stack>
  );
}
