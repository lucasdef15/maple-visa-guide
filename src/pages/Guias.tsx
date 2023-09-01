import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import ArticlesCard from '../components/cards/ArticlesCard';
import Loader from '../components/loaders/Loader';
import { useLocation } from 'react-router-dom';
import { uid } from 'uid';
import config from '../utilities/config';
import PostsContext from '../contexts/PostsContext';

const ArticleStyles = {
  minHeight: 'calc(100vh -130px)',
  marginBlock: { xs: '200px', sm: '50px' },
  width: '100%',
  zIndex: -1,
  position: 'relative',
  maxWidth: '1700px',
};

export default function Members() {
  const cat = useLocation().search;

  const { posts, setPost, loading, setLoading, fetchpost, query } =
    useContext(PostsContext);

  const filteredItems = posts.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja exlcuir essa Post?'
    );
    if (confirmed) {
      try {
        await axios.delete(`${config.APP_BASE_URL}/posts/${id}`);
        setPost(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchInit = async () => {
      setLoading(true);
      await fetchpost(cat);
    };
    fetchInit();
  }, [cat]);

  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{
        height: '100%',
        width: '100%',
        zIndex: '-1',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={ArticleStyles}
        direction='row'
        justifyContent='center'
        flexWrap='wrap'
        useFlexGap
        spacing={4}
      >
        {loading ? (
          <Loader />
        ) : filteredItems.length ? (
          filteredItems.map((post) => (
            <ArticlesCard
              key={uid()}
              id={post.id}
              title={post.title}
              img={post.img}
              desc={post.desc}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
          >
            <p>Nenhuma Publicação Encontrada</p>
          </Stack>
        )}
      </Stack>
    </motion.div>
  );
}
