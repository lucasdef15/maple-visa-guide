import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../utilities/config';
import { Stack } from '@mui/material';
import ChatHeader from '../forum/components/chat/ChatHeader';
import { Channel, Member } from '../../types';

export default function ChannelsPage() {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  const params = useParams();

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/channels/${params?.channelId}`
        );
        setChannel(response?.data?.channel);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/member/${params?.id}`
        );
        setMember(response?.data?.member);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
    fetchMember();
  }, [params?.channelId, params?.id]);

  return (
    <Stack
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark' ? '#313338' : '#fff',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <ChatHeader
        name={channel?.name}
        serverId={channel?.serverId}
        type='channel'
      />
    </Stack>
  );
}
