import axios from 'axios';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../utilities/config';
import { Stack } from '@mui/material';
import ChatHeader from '../forum/components/chat/ChatHeader';
import { Channel, Member } from '../../types';
import ChatInput from '../forum/components/chat/ChatInput';

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
      <Stack flex={1} sx={{ background: '#1212121d' }}>
        Future Messages
      </Stack>
      <ChatInput
        name={channel?.name as string}
        type='channel'
        apiUrl={`${config.APP_BASE_URL}/socket/messages`}
        query={{
          channelId: channel?.id,
          serverId: channel?.serverId,
        }}
      />
    </Stack>
  );
}
