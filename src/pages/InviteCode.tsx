import { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import config from '../utilities/config';
import { ServerWithMembersWithProfile as Server } from '../../types';

export default function InviteCode({ params }: any) {
  const [existingServer, setExistingServer] = useState<Server | null>(null);
  const [server, setServer] = useState<Server | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.patch(
        `${config.APP_BASE_URL}/server/update-server/${params.inviteCode}`
      );

      setServer(response.data.data.server);
    } catch (error) {
      console.log(error);
    }
  }, [params.inviteCode]);

  useEffect(() => {
    const fetchExistingServerData = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/server/existing-server/${params.inviteCode}`
        );

        setExistingServer(response.data.data.existingServer);

        if (!response.data.data.existingServer) {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExistingServerData();
  }, [params.inviteCode, fetchData]);

  if (existingServer) {
    return <Navigate to={`/membros/forum/servers/${existingServer.id}`} />;
  }

  if (server) {
    return <Navigate to={`/membros/forum/servers/${server.id}`} />;
  }

  return <div></div>;
}
