import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '../utilities/config';
import axios from 'axios';
import { Box, Stack } from '@mui/material';
import ServerSidebar from '../forum/components/server/ServerSidebar';

export default function ServerIdLayout() {
  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await axios.get(`${config.APP_BASE_URL}/server/${id}`);
        setServer(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchServer();
  }, [id]);

  return (
    <div>
      <Box
        sx={{
          overflow: 'hidden',
          //   display: { xs: 'flex' },
          width: '250px',
          height: '100vh',
          flexDirection: 'column',
          position: 'fixed',
        }}
      >
        <ServerSidebar serverId={id} />
      </Box>
      <Stack component={'main'} sx={{ pl: '250px' }}>
        <Outlet />
      </Stack>
    </div>
  );
}
