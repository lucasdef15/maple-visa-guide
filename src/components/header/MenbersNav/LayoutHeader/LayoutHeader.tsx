import { Stack, Typography, Button } from '@mui/material';
import { RiBookletFill } from 'react-icons/ri';
import Logo from '../../../logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { UserContext } from '../../../../contexts/UserContext';

const headerStyle = {
  background: '#ecececdd',
  width: '100%',
  maxWidth: '1700px',
  '& .logo': {
    width: '115px',
  },
};

export default function LayoutHeader() {
  const location = useLocation();

  const { categories } = useContext(CategoryContext);
  const { isAdmin } = useContext(UserContext);

  const catId: number = Number(location.search.split('=')[1]);

  const category = categories.find((cat) => cat.categoryID === catId);

  const breadCrumbs = `${
    location.pathname.includes('guias') ? 'Guias' : ''
  } \\ ${category?.name ?? 'Todos'}`;

  return (
    <Stack
      component={'header'}
      sx={{
        width: '100%',
        padding: '1rem',
        background: '#ecececdd',
        boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.103)',
      }}
      direction={'row'}
      justifyContent={'center'}
    >
      <Stack
        sx={headerStyle}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignItems={'center'}
        useFlexGap
        spacing={3}
      >
        <Stack>
          <Typography
            component={'h2'}
            sx={{ fontSize: '28px', fontweight: 'bold' }}
          >
            {breadCrumbs}
          </Typography>
          <Typography
            color={'text.secondary'}
            sx={{ fontSize: '15px', fontweight: 'light' }}
          >
            Explore nossas postagens mais recentes e mantenha-se atualizado!
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          spacing={{ xs: 2, md: 3.5 }}
          alignSelf={'end'}
          alignItems={'center'}
        >
          {isAdmin && (
            <Link to={'guias/write'}>
              <Button
                variant='contained'
                endIcon={<RiBookletFill />}
                sx={{
                  background: '#44b700',
                  py: '.5rem',
                  '&:hover': { background: 'limegreen' },
                  whiteSpace: 'nowrap',
                }}
              >
                New post
              </Button>
            </Link>
          )}
          <span className='logo'>
            <Logo color={'#222'} />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
}
