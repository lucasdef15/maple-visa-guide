import { Stack, Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import NavigationAction from './NavigationAction';
import NavigationItem from './NavigationItem';
import config from '../../../utilities/config';
import axios from 'axios';

const separatorStyle = {
  borderBottom: '2px solid #99999944',
  width: '100%',
  borderRadius: '40%',
  marginBlock: '1rem',
};

export default function NavigationSidebar() {
  const [servers, setServers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.APP_BASE_URL}/server`);
        setServers(response.data.servers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServers();
  }, []);

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
        {isLoading ? (
          <>
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              sx={{ marginBlock: 2, background: '#ffffff4b' }}
            />
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              sx={{ marginBlock: 2, background: '#ffffff4b' }}
            />
          </>
        ) : (
          servers.map((server: any) => (
            <div key={server?.id}>
              <NavigationItem
                id={server.id}
                name={server.name}
                imageUrl={server.imageUrl}
              />
            </div>
          ))
        )}
      </Box>
    </Stack>
  );
}
