import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import PostSideMenu from '../components/sideMenu/PostSideMenu';

const styledContent = {
  '& .img-container': {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '15px',
    },
  },
};

const styledAuthorInfo = {
  marginTop: '1rem',
  '& img': {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
};

export default function PostPage({ id }: any) {
  return (
    <Stack direction={'row'} useFlexGap gap={'50px'} sx={{ margin: '2rem' }}>
      <Stack className='content' flex={'5'} sx={styledContent}>
        <div className='img-container'>
          <img
            src='https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            alt=''
          />
        </div>
        <Stack sx={styledAuthorInfo} direction={'row'} spacing={2}>
          <img
            src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            alt=''
          />
          <div className='info'>
            <h3>Jhon</h3>
            <p>Posted 2 days ago</p>
          </div>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <IconButton
              aria-label='delete'
              sx={{ '&:hover': { background: 'tomato' } }}
            >
              <DeleteIcon />
            </IconButton>
            <Link to={`/write?edit=${id}`}>
              <IconButton
                aria-label='edit'
                sx={{ '&:hover': { background: 'teal' } }}
              >
                <BiSolidMessageSquareEdit />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
        <Stack
          className='content'
          sx={{
            textAlign: 'justify',

            '& h1': { my: 3 },
            '& p': { mb: 2, lineHeight: '30px' },
          }}
        >
          <h1>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna
            enim, tempor bibendum purus eget, tempor tempus dolor. Maecenas
            sodales elit vitae odio hendrerit dignissim. Nulla pulvinar eros at
            condimentum mollis. Pellentesque pharetra mi ut semper suscipit.
            Proin at risus vitae mi sollicitudin imperdiet. Sed sodales sagittis
            dui, vulputate sagittis nisi tincidunt eget. Mauris in porttitor
            ligula, vel aliquam sapien.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna
            enim, tempor bibendum purus eget, tempor tempus dolor. Maecenas
            sodales elit vitae odio hendrerit dignissim. Nulla pulvinar eros at
            condimentum mollis. Pellentesque pharetra mi ut semper suscipit.
            Proin at risus vitae mi sollicitudin imperdiet. Sed sodales sagittis
            dui, vulputate sagittis nisi tincidunt eget. Mauris in porttitor
            ligula, vel aliquam sapien.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna
            enim, tempor bibendum purus eget, tempor tempus dolor. Maecenas
            sodales elit vitae odio hendrerit dignissim. Nulla pulvinar eros at
            condimentum mollis. Pellentesque pharetra mi ut semper suscipit.
            Proin at risus vitae mi sollicitudin imperdiet. Sed sodales sagittis
            dui, vulputate sagittis nisi tincidunt eget. Mauris in porttitor
            ligula, vel aliquam sapien.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna
            enim, tempor bibendum purus eget, tempor tempus dolor. Maecenas
            sodales elit vitae odio hendrerit dignissim. Nulla pulvinar eros at
            condimentum mollis. Pellentesque pharetra mi ut semper suscipit.
            Proin at risus vitae mi sollicitudin imperdiet. Sed sodales sagittis
            dui, vulputate sagittis nisi tincidunt eget. Mauris in porttitor
            ligula, vel aliquam sapien.
          </p>
        </Stack>
      </Stack>
      <PostSideMenu />
    </Stack>
  );
}
