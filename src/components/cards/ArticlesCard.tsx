import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { DarkModeContext } from '../../contexts/DarkModeContext';

export default function ArticlesCard({
  id,
  title,
  img,
  desc,
  handleDelete,
}: any) {
  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const content = getText(desc);

  const base64ImageData = `data:image/jpeg;base64,${img}`;

  return (
    <Card key={id} sx={{ maxWidth: 345, height: '398px', zIndex: -1 }}>
      <Stack
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <CardMedia
          component='img'
          height='140'
          image={base64ImageData}
          alt='cover'
        />
        <CardContent>
          <Typography
            onClick={() => navigate(`${id}`)}
            gutterBottom
            variant='h5'
            component='div'
            sx={{ cursor: 'pointer' }}
          >
            {title.length > 38 ? `${title.slice(0, 38)}...` : title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {content?.length ?? ''.length > 200
              ? `${content?.slice(0, 200)}...`
              : content}
          </Typography>
        </CardContent>
        <CardActions sx={{ ml: 1 }}>
          <Button
            onClick={() => navigate(`${id}`)}
            sx={{ color: darkMode ? '#fff' : '' }}
          >
            Ler mais
          </Button>
          {isAdmin && (
            <>
              <IconButton
                aria-label='delete'
                onClick={() => handleDelete(id)}
                sx={{ '&:hover': { background: 'tomato', color: '#fff' } }}
              >
                <DeleteIcon />
              </IconButton>
              <Link to={`/membros/guias/edit/${id}`}>
                <IconButton
                  aria-label='edit'
                  sx={{ '&:hover': { background: 'teal', color: '#fff' } }}
                >
                  <BiSolidMessageSquareEdit />
                </IconButton>
              </Link>
            </>
          )}
        </CardActions>
      </Stack>
    </Card>
  );
}
