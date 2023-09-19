import { useContext, useEffect, useState } from 'react';
import { ForumContext } from '../../../contexts/ForumContext';
import axios from 'axios';
import config from '../../../utilities/config';
import { useParams } from 'react-router-dom';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { Stack, Typography } from '@mui/material';
import ServerHeader from './ServerHeader';
import { FaBullseye } from 'react-icons/fa';

interface ServerSidebarProps {
  serverId: string;
}

export default function ServerSidebar({ serverId }: ServerSidebarProps) {
  const { profile } = useContext(ForumContext);

  const { darkMode } = useContext(DarkModeContext);

  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(FaBullseye);

  const { id } = useParams();

  useEffect(() => {
    const fetchServer = async () => {
      setLoading(true);
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

  const textChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'TEXT'
  );
  const audioChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'AUDIO'
  );
  const videoChannels = server?.data?.serverComp?.channels?.filter(
    (channel: any) => channel.type === 'VIDEO'
  );
  const members = server?.data?.serverComp.members.filter(
    (member: any) => member.profileId !== profile.data.profile.id
  );

  const role = server?.data?.serverComp.members.find(
    (member: any) => member.profileId === profile.data.profile.id
  )?.role;

  return (
    <Stack
      direction={'column'}
      sx={{
        width: '100%',
        height: '100%',
        color: darkMode ? '#fff' : '',
        background: darkMode ? '#2B2D31' : '#F2F3F5',
      }}
    >
      <ServerHeader
        server={server?.data?.serverComp}
        role={role}
        isLoading={loading}
      />
    </Stack>
  );
}
