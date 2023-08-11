import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Article } from '../../pages/Guias';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

export default function ArticlesCard({ title, img, desc, id }: Article) {
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, height: '398px', zIndex: -1 }}>
      <Stack
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <CardMedia component='img' height='140' image={img} alt='cover' />
        <CardContent>
          <Typography
            onClick={handlePostClick}
            gutterBottom
            variant='h5'
            component='div'
            sx={{ cursor: 'pointer' }}
          >
            {title.length > 38 ? `${title.slice(0, 38)}...` : title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {desc.length > 200 ? `${desc.slice(0, 200)}...` : desc}
          </Typography>
        </CardContent>
        <CardActions sx={{ ml: 1 }}>
          <Button onClick={handlePostClick}>Ler mais</Button>
          <IconButton
            aria-label='delete'
            sx={{ '&:hover': { background: 'tomato' } }}
          >
            <DeleteIcon />
          </IconButton>
          <Link to={`edit/${id}`}>
            <IconButton
              aria-label='edit'
              sx={{ '&:hover': { background: 'teal' } }}
            >
              <BiSolidMessageSquareEdit />
            </IconButton>
          </Link>
        </CardActions>
      </Stack>
    </Card>
  );
}
