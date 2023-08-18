import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import ArticlesCard from '../components/cards/ArticlesCard';
import Loader from '../components/loaders/Loader';
import { useLocation } from 'react-router-dom';
import { uid } from 'uid';

export interface Article {
  id?: string;
  title: string;
  img: string;
  desc: string;
  handleDelete(id: string): void;
}

const ArticleStyles = {
  minHeight: '100vh',
  marginBlock: { xs: '200px', sm: '50px' },
  width: '100%',
  zIndex: -1,
  position: 'relative',
  maxWidth: '1700px',
};

export default function Members() {
  const [posts, setPost] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const cat = useLocation().search;

  const fetchpost = async () => {
    try {
      const { data: response } = await axios.get(
        `http://localhost:8080/posts${cat}`
      );
      setPost(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`);
      setPost(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchpost();
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
        ) : posts.length ? (
          posts.map((post) => (
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
            <p>Nenhuma Publicação</p>
          </Stack>
        )}
      </Stack>
    </motion.div>
  );
}
