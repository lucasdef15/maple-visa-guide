import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import config from '../../utilities/config';

interface MenbersCardProps {
  planName: string;
  price: number;
  priceId: string;
}

export default function MediaCard({
  planName,
  price,
  priceId,
}: MenbersCardProps) {
  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      `${config.APP_BASE_URL}/subs/session`,
      { priceId }
    );

    window.location.href = response.session.url;
  };

  return (
    <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
      <CardMedia
        sx={{ height: 140 }}
        image='https://plus.unsplash.com/premium_photo-1663100543409-061876b76b0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {planName}
        </Typography>
        <Typography variant='h4' color='primary.main' component='span'>
          R${price / 100},00
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='text'
          color='secondary'
          sx={{ width: '100%' }}
          onClick={() => createSession(priceId)}
        >
          Adquirir
        </Button>
      </CardActions>
    </Card>
  );
}
