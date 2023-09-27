import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import config from '../utilities/config';
import axios from 'axios';
import { Box, Stack } from '@mui/material';
import ServerSidebar from '../forum/components/server/ServerSidebar';
import { ForumContext } from '../contexts/ForumContext';

export default function ServerIdLayout() {
  const [server, setServer] = useState<any>(null);

  const { setIsServerLoading } = useContext(ForumContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        setIsServerLoading(true);
        const response = await axios.get(`${config.APP_BASE_URL}/server/${id}`);
        setServer(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsServerLoading(false);
      }
    };

    fetchServer();
  }, [id]);

  return (
    <div>
      <Box
        sx={{
          overflow: 'hidden',
          width: '250px',
          height: '100vh',
          flexDirection: 'column',
          position: 'fixed',
        }}
      >
        <ServerSidebar serverId={id as string} />
      </Box>
      <Stack component={'main'} sx={{ pl: '250px' }}>
        <Outlet />
      </Stack>
    </div>
  );
}
