import { useEffect, useState } from 'react';
import config from '../utilities/config';
import { useParams } from 'react-router-dom';
import { ServerWithMembersWithProfile as Server } from '../../types';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';

export default function ServerPage() {
  const [server, setServer] = useState<Server | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/server/${params?.id}`
        );
        setServer(response.data.data.serverComp);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServer();
  }, [params?.id]);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
    );
  } else if (!loading) {
    const initialChannel = server?.channels?.find(
      (channel) => channel.name === 'general'
    );
    if (initialChannel) {
      return (
        <Navigate
          to={`/membros/forum/servers/${params?.id}/channels/${initialChannel?.id}`}
        />
      );
    }
  }
}
