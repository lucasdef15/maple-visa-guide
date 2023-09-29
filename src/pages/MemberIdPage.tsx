import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import config from '../utilities/config';
import { useParams } from 'react-router-dom';
import qs from 'query-string';
import { Stack } from '@mui/material';
import ChatHeaderMemo from '../forum/components/chat/ChatHeader';

export default function MemberIdPage() {
  const [data, setData] = useState<any>(null);

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

  console.log(data?.members?.otherMember?.profile?.name);

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
    </Stack>
  );
}
