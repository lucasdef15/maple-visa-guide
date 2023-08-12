import { Stack, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import PostSideMenu from '../components/sideMenu/PostSideMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const styledContent = {
  '& .img-container': {
    width: '100%',
    height: '300px',
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

interface PostProps {
  name: string;
  img: string;
  userImg: string;
  id: number;
  title: string;
  desc: string;
  date: number;
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
  });

  const location = useLocation();

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
    // try {
    //   await axios.delete(`http://localhost:8080/posts/${post.id}`);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Stack direction={'row'} useFlexGap gap={'50px'} sx={{ margin: '2rem' }}>
      <Stack className='content' flex={'5'} sx={styledContent}>
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
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <IconButton
              aria-label='delete'
              onClick={handleDelete}
              sx={{ '&:hover': { background: 'tomato' } }}
            >
              <DeleteIcon />
            </IconButton>
            <Link to={`/write?edit=${post.id}`}>
              <IconButton
                aria-label='edit'
                sx={{ '&:hover': { background: 'teal' } }}
              >
                <BiSolidMessageSquareEdit />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        <Stack
          className='content'
          sx={{
            textAlign: 'justify',

            '& h1': { my: 3 },
            '& p': { mb: 2, lineHeight: '30px' },
          }}
        >
          <h1>{post.title}</h1>
          <Stack>{post.desc}</Stack>
        </Stack>
      </Stack>
      <PostSideMenu />
    </Stack>
  );
}
