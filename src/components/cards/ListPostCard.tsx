import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';

const Item = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: '15px',
  padding: '1rem 1rem 1rem 1rem',
  display: 'flex',
  gap: '3rem',
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

  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const content = getText(desc);

  return (
    <Item elevation={4} sx={{ maxWidth: { xs: '645px', lg: '545px' } }}>
      <Stack
        onClick={() => navigate(`${id}`)}
        sx={{
          '& img': {
            width: '100px',
            height: '100px',
            scale: { xs: '1.5', lg: '1.6' },
            cursor: 'pointer',
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
              cursor: 'pointer',
              transition: 'all .5s',
              '&:hover': { color: '#01244A' },
            }}
          >
            {title.length > 26 ? `${title.slice(0, 26)}...` : title}
          </Typography>
          <Typography
            onClick={() => navigate(`${id}`)}
            sx={{
              cursor: 'pointer',
              transition: 'all .5s',
              '&:hover': { color: '#01244A' },
            }}
          >
            {content?.length ?? ''.length > 100
              ? `${content?.slice(0, 100)}...`
              : content}
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
