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
  imageUrl: string;
  content: string;
}

const ArticleStyles = {
  minHeight: 'calc(100vh - 100px)',
};

export default function Members() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data: response } = await axios.get(
        'http://localhost:8080/articles'
      );

      setArticles(response.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
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
        ) : articles.length ? (
          articles.map((article) => (
            <ArticlesCard
              key={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              content={article.content}
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
            <Link to='/membros-plano'>Comprar Plano</Link>
          </Stack>
        )}
      </Stack>
    </motion.div>
  );
}
