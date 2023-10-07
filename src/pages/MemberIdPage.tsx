import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import config from '../utilities/config';
import { useParams } from 'react-router-dom';
import qs from 'query-string';
import { Stack } from '@mui/material';
import ChatHeaderMemo from '../forum/components/chat/ChatHeader';
import ChatMessages from '../forum/components/chat/ChatMessages';
import ChatInput from '../forum/components/chat/ChatInput';

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
      <ChatMessages
        member={data?.churrentMember}
        name={data?.members?.otherMember?.profile?.name}
        chatId={data?.conversation?.id}
        type={'conversation'}
        apiUrl={`${config.APP_BASE_URL}/socket/direct-messages`}
        socketUrl={`${config.APP_BASE_URL}/socket/direct-messages`}
        socketQuery={{
          conversationId: data?.conversation?.id as string,
        }}
        paramKey='conversationId'
        paramValue={data?.conversation?.id as string}
      />
      <ChatInput
        name={data?.members?.otherMember?.profile?.name}
        type={'conversation'}
        apiUrl={`${config.APP_BASE_URL}/socket/direct-messages`}
        query={{
          conversationId: data?.conversation?.id as string,
        }}
      />
    </Stack>
  );
}
