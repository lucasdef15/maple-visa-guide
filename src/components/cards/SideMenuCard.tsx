import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Article } from '../../pages/Guias';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../loaders/Loader';

interface MenuCardPorops extends Article {
  categoryID: number;
}

export default function SideMenuCard({ categoryID, title }: any) {
  const [posts, setPost] = useState<MenuCardPorops[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:8080/posts?categoryID=${categoryID}`
        );
        setPost(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost([]);
        setLoading(false);
      }
    };

    if (categoryID) {
      fetchpost();
    }
  }, [categoryID]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) =>
          categoryID === post.categoryID && title === post.title ? null : (
            <Card key={post.id} sx={{ maxWidth: 345, borderRadius: '15px' }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image={post.img}
                  alt='green iguana'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {post.title.length > 20
                      ? `${post.title.slice(0, 20)}...`
                      : post.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {post.desc.length > 150
                      ? `${post.desc.slice(0, 150)}...`
                      : post.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/membros/guias/${post.id}`}>
                  <Button color='primary' onClick={scrollToTop}>
                    Ler mais
                  </Button>
                </Link>
              </CardActions>
            </Card>
          )
        )
      )}
    </>
  );
}
