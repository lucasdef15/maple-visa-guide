import { Box, LinearProgress, Stack } from '@mui/material';
import { Member } from '../../../../types';
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '../../hooks/use-chat-query';
import { Fragment, useContext, useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { format } from 'date-fns';
import { useChatSocket } from '../../hooks/use-chat-socket';
import { ForumContext } from '../../../contexts/ForumContext';

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
  const [progress, setProgress] = useState(0);

  const bearerToken = localStorage.getItem('token')!;
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { isChannelLoading, setIsChannelLoading } = useContext(ForumContext);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue, bearerToken });

  useChatSocket({ queryKey, addKey, updateKey });

  useEffect(() => {
    if (status === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <Box sx={{ width: '100%', minHeight: 'calc(100vh - 64px - 90px)' }}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
    );
  }

  if (status === 'error') {
    return <div>Server crash</div>;
  }

  return (
    <Stack
      flex={1}
      sx={{ py: 4, overflowY: 'auto', maxHeight: 'calc(100vh - 90px - 64px)' }}
    >
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
