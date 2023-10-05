import { Box, Stack } from '@mui/material';
import { Member } from '../../../../types';
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '../../hooks/use-chat-query';
import { Fragment } from 'react';
import ChatItem from './ChatItem';
import { format } from 'date-fns';

const DATE_FORMAT = 'd MMM yyy, HH:mm';

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
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                imageB64={message.imageB64}
                userImage={message.member.profile.imageUrl}
                fileName={message.fileName}
                fileData={message.fileData}
                fileType={message.fileType}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}
