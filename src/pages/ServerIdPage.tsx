import { useEffect, useState } from 'react';
import config from '../utilities/config';
import { useParams } from 'react-router-dom';
import { ServerWithMembersWithProfile as Server } from '../../types';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function ServerPage() {
  const [server, setServer] = useState<Server | null>(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      try {
        setLoading(true);
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

  if (loading) {
    return <div>Loading...</div>;
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
