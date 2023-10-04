import { Box, Stack } from '@mui/material';
import { Member } from '../../../../types';
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '../../hooks/use-chat-query';
import { Fragment } from 'react';

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  type: 'channel' | 'conversation';
}

export default function ChatMessages({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) {
  const queryKey = `chat:${chatId}`;
  const bearerToken = localStorage.getItem('token')!;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue, bearerToken });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Server crash</div>;
  }

  return (
    <Stack flex={1} sx={{ py: 4, overflowY: 'auto' }}>
      <Box flex={1} />
      <ChatWelcome type={type} name={name} />
      <Stack direction={'column-reverse'} sx={{ mt: 'auto' }}>
        {data?.pages?.map((group, index) => (
          <Fragment key={index}>
            {group?.items?.map((message: any) => (
              <div key={message?.id}>{message?.content}</div>
            ))}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}
