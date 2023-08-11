import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../loaders/Loader';
import { Article } from '../../pages/Guias';
import SideMenuCard from '../cards/SideMenuCard';
import { Stack, Typography } from '@mui/material';

export default function PostSideMenu() {
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
    <Stack spacing={4}>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: '22px',
          fontWeight: 'bold',
        }}
      >
        Other Posts you may like
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <SideMenuCard
            key={post.id}
            id={post.id}
            title={post.title}
            img={post.img}
            desc={post.desc}
          />
        ))
      )}
    </Stack>
  );
}
