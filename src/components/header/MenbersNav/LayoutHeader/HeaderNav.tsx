import { Stack, Typography, Button } from '@mui/material';
import { RiBookletFill } from 'react-icons/ri';
import Logo from '../../../logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import config from '../../../../utilities/config';

export interface PostProps {
  name: string;
  img: string;
  userImg: string;
  id: number;
  title: string;
  desc: string;
  date: number;
  categoryID: number;
}

export default function HeaderNav() {
  const location = useLocation();
  const [post, setPost] = useState<PostProps>({
    name: '',
    img: '',
    id: 0,
    title: '',
    desc: '',
    date: 0,
    userImg: '',
    categoryID: 0,
  });

  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const headerStyle = {
    background: darkMode ? '#222' : '#ecececdd',
    width: '100%',
    paddingInline: { xs: '1rem', lg: '2rem' },
    maxWidth: '1700px',
    '& .logo': {
      width: '115px',
    },
  };

  const catId: number = Number(location.search.split('=')[1]);

  const postId = location.pathname.split('/')[3];

  let PostCategory;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${config.APP_BASE_URL}/posts/${postId}`
        );
        setPost(response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  // if (postId && post) {
  //   PostCategory = categories.find((cat) => cat.categoryID === post.categoryID);
  // }

  // const breadCrumbs = `${
  //   location.pathname.includes('guias') ? 'Guias' : ''
  // } \\ ${
  //   category?.name ? category?.name : PostCategory ? PostCategory.name : 'Todos'
  // }`;
  return (
    <Stack
      component={'header'}
      sx={{
        width: '100%',
        padding: '1rem',
        background: darkMode ? '#222' : '#ecececdd',
        boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.103)',
        display: { xs: 'none', sm: 'flex' },
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        sx={headerStyle}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        useFlexGap
        spacing={3}
      >
        <Stack>
          <Typography
            component={'h2'}
            sx={{
              fontSize: '28px',
              fontweight: 'bold',
              color: darkMode ? '#fff' : '',
            }}
          >
            {/* {breadCrumbs} */} null
          </Typography>
          <Typography
            color={'text.secondary'}
            sx={{ fontSize: '15px', fontweight: 'light' }}
          >
            Explore nossas postagens mais recentes e mantenha-se atualizado!
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
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
                  color: '#fff',
                }}
              >
                New post
              </Button>
            </Link>
          )}
          <span className='logo'>
            <Logo color={darkMode ? '#fff' : '#222'} />
          </span>
        </Stack>
      </Stack>
    </Stack>
  );
}
