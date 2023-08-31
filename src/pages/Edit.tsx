import { useState, useContext, useEffect } from 'react';
import { Stack } from '@mui/material';
import { routesVariants } from '../animations/animations';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PostProps } from './PostPage';
import TinyMCEditor from '../components/tinyMCEditor/TinyMCEditor';
import { DarkModeContext } from '../contexts/DarkModeContext';
import config from '../utilities/config';
import Categories from '../components/categories/Categories';

export default function Edit() {
  const [postData, setPostData] = useState<PostProps>({
    name: '',
    img: '',
    id: 0,
    title: '',
    desc: '',
    date: 0,
    userImg: '',
    categoryID: 0,
  });
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');

  const { darkMode } = useContext(DarkModeContext);

  const postId = useLocation().pathname.split('/')[4];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${config.APP_BASE_URL}/posts/${postId}`
        );
        setPostData(response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const setPostInfo = () => {
      setValue(postData.desc);
      setTitle(postData.title);
    };
    setPostInfo();
  }, [postData.desc, postData.title]);

  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      <Stack
        className='add'
        direction={{ xs: 'column', lg: 'row' }}
        useFlexGap
        spacing={3}
        sx={{ m: { xs: '11rem 1rem', sm: '3rem 2rem' } }}
      >
        <Stack className='content' flex={7}>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              background: darkMode ? '#222f3e' : '#fff',
              color: darkMode ? '#fff' : '',
              borderColor: darkMode ? '#222f3e' : '',
              padding: '10px',
              fontSize: '18px',
              border: '1px solid lightgray',
              borderRadius: '10px',
              paddingLeft: '1rem',
              marginBottom: '1rem',
            }}
          />
          <TinyMCEditor setValue={setValue} value={value} />
        </Stack>
        <Stack
          className='menu'
          flex={2}
          sx={{
            '& .item': {
              border: '1px solid lightgray',
              padding: '1rem',
              minHeight: '150px',
              borderRadius: '15px',
              marginBottom: '1rem',
              color: darkMode ? '#fff' : '',
            },
          }}
        >
          <Categories title={title} value={value} postData={postData} />
        </Stack>
      </Stack>
    </motion.div>
  );
}
