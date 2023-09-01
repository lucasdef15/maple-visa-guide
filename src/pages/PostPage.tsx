import { Stack, Avatar, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostSideMenu from '../components/sideMenu/PostSideMenu';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import Parser from 'html-react-parser';
import { UserContext } from '../contexts/UserContext';
import { DarkModeContext } from '../contexts/DarkModeContext';
import config from '../utilities/config';
import Loader from '../components/loaders/Loader';

const styledContent = {
  width: '100%',
  maxWidth: '1300px',
  '& .img-container': {
    width: '100%',
    height: { xs: '230px', sm: '344px' },
    objectFit: 'cover',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '15px',
    },
  },
};

const styledAuthorInfo = {
  marginTop: '1rem',
};

export interface PostProps {
  name: string;
  img: string;
  userImg: string;
  id: number;
  title: string;
  desc: string;
  date: number;
  edited: number;
  categoryID: number;
}

export default function PostPage() {
  const [post, setPost] = useState<PostProps>({
    name: '',
    img: '',
    id: 0,
    title: '',
    desc: '',
    date: 0,
    edited: 0,
    userImg: '',
    categoryID: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const location = useLocation();
  const navigate = useNavigate();

  moment.locale('pt-br');

  const postId = location.pathname.split('/')[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${config.APP_BASE_URL}/posts/${postId}`
        );
        setPost(response[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Post?'
    );
    if (confirmed) {
      try {
        await axios.delete(`${config.APP_BASE_URL}/posts/${post.id}`);
        navigate('/membros/guias');
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleBackgroundColorSpans = () => {
      const contentDiv = document.querySelector('.content');
      if (contentDiv) {
        const spanElements = contentDiv.getElementsByTagName('span');

        for (const span of spanElements) {
          const backgroundColor = window.getComputedStyle(span).backgroundColor;

          span.classList.remove('highlighted-span');
          if (backgroundColor !== 'rgba(0, 0, 0, 0)' && darkMode) {
            span.classList.add('highlighted-span');
          }
        }
      }
    };

    handleBackgroundColorSpans();
  }, [darkMode]);

  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      sx={{
        width: { xs: '100%', sm: 'calc(100% - 1rem)' },
        color: darkMode ? '#fff' : '',
        pt: { xs: '170px', sm: '0.8rem' },
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        useFlexGap
        spacing={'3vw'}
        sx={{
          margin: { xs: '0', sm: '2rem', lg: '3rem' },
          width: '100%',
          maxWidth: '1700px',
          p: '1rem',
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <Stack sx={styledContent}>
            <Typography
              variant={'h4'}
              sx={{
                fontSize: 'clamp(18px, 5vw, 35px)',
                mb: '1.7rem',
                fontWeight: 'bold',
              }}
            >
              {post.title}
            </Typography>
            <div className='img-container'>
              <img src={post?.img} alt='' />
            </div>
            <Stack sx={styledAuthorInfo} direction={'row'} spacing={2}>
              {post.userImg ? (
                <Avatar alt={post.name} src={post.userImg} />
              ) : (
                <Avatar sx={{ color: '#fff' }}>
                  {post.name.slice(0, 1).toLocaleUpperCase()}
                </Avatar>
              )}
              <div className='info'>
                <h3>{post.name}</h3>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {isAdmin && (
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <IconButton
                    aria-label='delete'
                    onClick={handleDelete}
                    sx={{ '&:hover': { background: 'tomato', color: '#fff' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link to={`/membros/guias/edit/${postId}`}>
                    <IconButton
                      aria-label='edit'
                      sx={{ '&:hover': { background: 'teal', color: '#fff' } }}
                    >
                      <BiSolidMessageSquareEdit />
                    </IconButton>
                  </Link>
                </Stack>
              )}
            </Stack>
            <div
              className='content'
              style={{
                marginBlock: '3rem',
                textAlign: 'justify',
              }}
            >
              {Parser(post.desc)}
            </div>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <small>
                Última edição em{' '}
                {moment(post.edited).format('DD-MM-YYYY / HH:mm')} (GMT-3)
              </small>
              <Button>Reportar Esse Post</Button>
            </Stack>
          </Stack>
        )}
        <PostSideMenu
          categoryID={post.categoryID}
          title={post.title}
          setLoading={setLoading}
        />
      </Stack>
    </Stack>
  );
}
