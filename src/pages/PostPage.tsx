import { Stack, Avatar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostSideMenu from '../components/sideMenu/PostSideMenu';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import Parser from 'html-react-parser';
import { UserContext } from '../contexts/UserContext';

const styledContent = {
  '& .img-container': {
    width: '100%',
    height: '344px',
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
    userImg: '',
    categoryID: 0,
  });

  const { isAdmin } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8080/posts/${postId}`
        );
        setPost(response[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${post.id}`);
      navigate('/membros/guias');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      sx={{
        width: 'calc(100% - 1rem)',
      }}
    >
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        useFlexGap
        gap={'3vw'}
        sx={{
          margin: { xs: '2rem', lg: '3rem' },
          width: '100%',
          maxWidth: '1700px',
        }}
      >
        <Stack className='content' flex={'6'} sx={styledContent}>
          <Typography
            variant={'h4'}
            sx={{
              fontSize: 'clamp(20px, 5vw, 35px)',
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
              <Avatar>{post.name.slice(0, 1).toLocaleUpperCase()}</Avatar>
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
                  sx={{ '&:hover': { background: 'tomato' } }}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={`/membros/guias/edit/${postId}`}>
                  <IconButton
                    aria-label='edit'
                    sx={{ '&:hover': { background: 'teal' } }}
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
        </Stack>
        <PostSideMenu categoryID={post.categoryID} title={post.title} />
      </Stack>
    </Stack>
  );
}
