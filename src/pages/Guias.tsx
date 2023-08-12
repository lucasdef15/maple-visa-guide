import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticlesCard from '../components/cards/ArticlesCard';
import Loader from '../components/loaders/Loader';
import { useLocation } from 'react-router-dom';

export interface Article {
  id?: string;
  title: string;
  img: string;
  desc: string;
}

const ArticleStyles = {
  minHeight: '100vh',
  marginBlock: '50px',
  width: '100%',
  zIndex: -1,
  position: 'relative',
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
      }}
    >
      <Stack
        sx={ArticleStyles}
        direction='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        useFlexGap
        spacing={4}
      >
        {loading ? (
          <Loader />
        ) : posts.length ? (
          posts.map((post) => (
            <ArticlesCard
              key={post.id}
              id={post.id}
              title={post.title}
              img={post.img}
              desc={post.desc}
            />
          ))
        ) : (
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            spacing={2}
          >
            <p>You don't have a plan</p>
            <Link to='/plano'>Comprar Plano</Link>
          </Stack>
        )}
      </Stack>
    </motion.div>
  );
}
