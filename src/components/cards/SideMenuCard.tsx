import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Article } from '../../pages/Guias';
import { Link } from 'react-router-dom';

export default function SideMenuCard({ title, img, desc, id }: Article) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '15px' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={img}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {desc.length > 150 ? `${desc.slice(0, 150)}...` : desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/membros/guias/${id}`}>
          <Button color='primary'>Ler mais</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
