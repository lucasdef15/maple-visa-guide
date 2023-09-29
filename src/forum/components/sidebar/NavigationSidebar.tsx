import { Stack, Box, Skeleton } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import NavigationAction from './NavigationAction';
import NavigationItem from './NavigationItem';
import config from '../../../utilities/config';
import axios from 'axios';
import _ from 'lodash';

const separatorStyle = {
  borderBottom: '2px solid #99999944',
  width: '100%',
  borderRadius: '40%',
  marginBlock: '1rem',
};

const NavigationSidebar = () => {
  const [servers, setServers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.APP_BASE_URL}/server`);
      setServers(response.data.servers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServers();
  }, [fetchServers]);

  return (
    <Stack
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark' ? '#1e1f22' : '#e3e5e8',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        py: '10px',
        px: '2px',
        overflow: 'hiden',
      }}
    >
      <NavigationAction />
      <Box sx={separatorStyle} />
      <Box
        sx={{
          mb: 2,
          height: 'calc(100vh - 120px)',
          overflow: 'auto',
          px: '10px',
        }}
      >
        {isLoading ? (
          <>
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              sx={{
                marginBlock: 2,
                background: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
              }}
            />
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              sx={{
                marginBlock: 2,
                background: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
              }}
            />
            <Skeleton
              variant='circular'
              width={48}
              height={48}
              sx={{
                marginBlock: 2,
                background: (theme) =>
                  theme.palette.mode === 'dark' ? '#ffffff4b' : '#22222228',
              }}
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
};

const NavigationSidebarMemo = memo(
  NavigationSidebar,
  (prevProps, nextProps) => {
    return _.isEqual(prevProps, nextProps);
  }
);

export default NavigationSidebarMemo;