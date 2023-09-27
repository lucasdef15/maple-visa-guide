import { useNavigate, useParams } from 'react-router-dom';
import ActionTooltip from '../actionTooltip/ActionTooltip';
import { Box } from '@mui/material';

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export default function NavigationItem({
  id,
  imageUrl,
  name,
}: NavigationItemProps) {
  const params = useParams();

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/membros/forum/servers/${id}`);
  };

  const base64ImageData = `data:image/jpeg;base64,${imageUrl}`;

  return (
    <>
      <ActionTooltip title={name} placement='right'>
        <Box
          onClick={onClick}
          sx={{
            postion: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBlock: 2,
            '&:hover .sideIcon': {
              height: params?.id !== id ? '20px' : '36px',
            },
          }}
        >
          <Box
            className='sideIcon'
            sx={{
              position: 'absolute',
              left: '-2.5px',
              background: (theme) =>
                theme.palette.mode === 'dark' ? '#fff' : '#121212',
              borderRadius: '15px',
              transition: 'all 250ms',
              width: '6px',
              height: params?.id === id ? '36px' : '8px',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              height: '48px',
              width: '48px',
              transition: 'all 250ms',
              overflow: 'hidden',
              borderRadius: params?.id === id ? '16px' : '50%',
              '&:hover': {
                borderRadius: '16px',
              },
            }}
          >
            <img
              src={base64ImageData}
              alt={name}
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Box>
      </ActionTooltip>
    </>
  );
}
