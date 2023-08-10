import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticlesCard from '../components/cards/ArticlesCard';
import Loader from '../components/loaders/Loader';

export interface Article {
  id?: string;
  title: string;
  img: string;
  desc: string;
}

const ArticleStyles = {
  minHeight: '100vh',
  width: '100%',
};

const menbersContainer = {
  height: '100%',
  width: '100%',
};

export default function Members() {
  const [posts, setPost] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchpost();
  }, []);

  const fetchpost = async () => {
    try {
      const { data: response } = await axios.get('http://localhost:8080/posts');
      setPost(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={menbersContainer}
    >
      <Stack
        sx={ArticleStyles}
        direction='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        spacing={2}
      >
        {loading ? (
          <Loader />
        ) : posts.length ? (
          posts.map((post) => (
            <ArticlesCard
              key={post.id}
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
