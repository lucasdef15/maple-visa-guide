import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import config from '../utilities/config';
import { useParams } from 'react-router-dom';
import qs from 'query-string';
import { Button, Stack } from '@mui/material';
import ChatHeaderMemo from '../forum/components/chat/ChatHeader';
import io from 'socket.io-client';

// const socket = io('http://localhost:8080/');

export default function MemberIdPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState<any>('');

  const params = useParams();

  const fetchServer = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: `${config.APP_BASE_URL}/conversations/`,
        query: {
          serverId: params?.id,
          memberId: params?.memberId,
        },
      });
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [params?.id, params?.memberId]);

  useEffect(() => {
    fetchServer();
  }, [fetchServer]);


  return (
    <Stack
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark' ? '#313338' : '#fff',
      }}
    >
      <ChatHeaderMemo
        imageUrl={data?.members?.otherMember?.profile?.imageUrl}
        name={data?.members?.otherMember?.profile?.name}
        serverId={params?.id}
        type={'conversation'}
      />
      <Stack sx={{ mt: 5 }} direction={'row'}>
        <input type='text' onChange={(e) => setMessage(e.target.value)} />
        {/* <Button onClick={sendMessage}>send</Button> */}
      </Stack>
      <Stack sx={{ mt: 5 }} direction={'row'}>
        {receivedMessage}
      </Stack>
    </Stack>
  );
}
