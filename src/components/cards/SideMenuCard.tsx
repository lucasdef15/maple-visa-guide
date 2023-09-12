import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../loaders/Loader';
import config from '../../utilities/config';

interface MenuCardPorops {
  categoryID: number;
  id: number;
  desc: string;
  title: string;
  img: string;
}

export default function SideMenuCard({ categoryID, postId, setLoadingPostPage }: any) {
  const [posts, setPost] = useState<MenuCardPorops[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchpost = async () => {
      try {
        const { data: response } = await axios.get(
          `${config.APP_BASE_URL}/posts?categoryID=${categoryID}`
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
  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) =>
          Number(postId) === post.id ? null : (
            <Card key={post.id} sx={{ maxWidth: 385, borderRadius: '15px' }}>
              <Link
                to={`/membros/guias/${post.id}`}
                onClick={() => setLoadingPostPage(true)}
              >
                <CardActionArea onClick={scrollToTop}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={`data:image/jpeg;base64,${post.img}`}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {post.title.length > 20
                        ? `${post.title.slice(0, 20)}...`
                        : post.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {getText(post.desc)?.length ?? ''.length > 150
                        ? `${getText(post.desc)?.slice(0, 150)}...`
                        : getText(post.desc)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          )
        )
      )}
    </>
  );
}
