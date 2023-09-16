import { Stack, Box } from '@mui/material';
import { useContext } from 'react';

import NavigationAction from './NavigationAction';
import NavigationItem from './NavigationItem';
import { ForumContext } from '../../../contexts/ForumContext';

const separatorStyle = {
  borderBottom: '2px solid #99999944',
  width: '100%',
  borderRadius: '40%',
  marginBlock: '1rem',
};

export default function NavigationSidebar() {
  const { servers } = useContext(ForumContext);
  return (
    <Stack
      sx={{
        background: '#222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        p: '10px',
        overflow: 'hiden',
      }}
    >
      <NavigationAction />
      <Box sx={separatorStyle} />
      <Box sx={{ mb: 2 }}>
        {servers.map((server: any) => (
          <div key={server?.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </Box>
    </Stack>
  );
}
