import { motion } from 'framer-motion';
import { routesVariants } from '../animations/animations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticlesCard from '../components/cards/ArticlesCard';

export interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const ArticleStyles = {
  minHeight: 'calc(100vh - 100px)',
};

export default function Menbers() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, []);
  const fetchArticles = async () => {
    const { data: response } = await axios.get(
      'http://localhost:8080/articles'
    );

    setArticles(response.articles);
  };
  return (
    <motion.div
      variants={routesVariants}
      initial='initial'
      animate='visible'
      exit='exit'
      style={{ position: 'relative', zIndex: -1 }}
    >
      {articles?.length ? (
        <Stack
          sx={ArticleStyles}
          direction='row'
          justifyContent='center'
          alignItems='center'
          flexWrap='wrap'
          spacing={2}
        >
          {articles.map((article) => (
            <ArticlesCard
              id={article.id}
              key={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              content={article.content}
            />
          ))}
        </Stack>
      ) : (
        <Stack
          sx={ArticleStyles}
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
    </motion.div>
  );
}
