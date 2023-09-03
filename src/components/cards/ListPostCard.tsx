import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import MainContext from '../../contexts/MainContext';

const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: '15px',
  padding: '1rem 1rem 1rem 1rem',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  maxHeight: '135px',
}));

export default function ListPostCard({
  title,
  desc,
  img,
  handleDelete,
  id,
}: any) {
  const navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);
  const { openMenu } = useContext(MainContext);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const content = getText(desc);

  return (
    <Item
      elevation={4}
      sx={{
        maxWidth: { xs: '645px', lg: '545px' },
        minWidth: '345px',
        gap: { xs: '1.5rem', sm: '2.5rem', lg: '3rem' },
      }}
    >
      <Stack
        onClick={() => navigate(`${id}`)}
        sx={{
          '& img': {
            width: { xs: '55px', sm: '90px' },
            height: { xs: '80px', sm: '90px' },
            scale: { xs: '1.6', lg: '1.6' },
            cursor: 'pointer',
            borderRadius: '5px',
            objectFit: 'cover',
          },
        }}
      >
        <img src={img} alt={title} />
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Stack>
          <Typography
            component={'h1'}
            variant='h5'
            onClick={() => navigate(`${id}`)}
            sx={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all .5s',
              '&:hover': { color: darkMode ? '#0080e8' : '#0080e8' },
            }}
          >
            {title.length > 26 ? `${title.slice(0, 26)}...` : title}
          </Typography>
          <Typography
            onClick={() => navigate(`${id}`)}
            sx={{
              fontSize: 'clamp(.85rem, 1vw, 1rem)',
              cursor: 'pointer',
              transition: 'all .5s',
              '&:hover': { color: darkMode ? '#0080e8' : '#0080e8' },
            }}
          >
            {windowSize.width > 750
              ? content?.length ?? ''.length > 100
                ? `${
                    windowSize.width < 850 && openMenu
                      ? content?.slice(0, 50)
                      : content?.slice(0, 100)
                  }...`
                : content
              : `${content?.slice(0, 50)}...`}
          </Typography>
        </Stack>
        {isAdmin && (
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <IconButton
              aria-label='delete'
              onClick={handleDelete}
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
          </Stack>
        )}
      </Stack>
    </Item>
  );
}
