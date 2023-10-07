import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Member } from '../../../../types';
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '../../hooks/use-chat-query';
import { Fragment, useContext, useEffect, useRef, ElementRef } from 'react';
import ChatItem from './ChatItem';
import { format } from 'date-fns';
import { useChatSocket } from '../../hooks/use-chat-socket';
import { ForumContext } from '../../../contexts/ForumContext';
import { useChatScroll } from '../../hooks/use-chat-scoll';
import { LuServerCrash } from 'react-icons/lu';

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
  const bearerToken = localStorage.getItem('token')!;
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const { setIsChannelLoading, isChannelLoading } = useContext(ForumContext);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue, bearerToken });
  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  useEffect(() => {
    setIsChannelLoading(true);
    if (status === 'loading') {
      setIsChannelLoading(true);
    }
    if (status === 'success') {
      setIsChannelLoading(false);
    }
  }, [status, data, setIsChannelLoading]);

  if (status === 'loading') {
    return (
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 64px - 90px)',
        }}
      >
        <CircularProgress size={25} thickness={2} />
      </Stack>
    );
  }

  if (status === 'error') {
    return (
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          textAlign: 'center',
          minHeight: 'calc(100vh - 64px - 90px)',
          fontSize: '2rem',
        }}
      >
        <LuServerCrash />
        <Typography color={(theme) => theme.palette.text.secondary}>
          Somenthing went wrong!
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      ref={chatRef}
      flex={1}
      sx={{ py: 4, overflowY: 'auto', maxHeight: 'calc(100vh - 90px - 64px)' }}
    >
      {!hasNextPage && <Box flex={1} />}
      {!hasNextPage && (
        <ChatWelcome
          type={type}
          name={name}
          isChannelLoading={isChannelLoading}
        />
      )}
      {hasNextPage && (
        <Stack>
          {isFetchingNextPage ? (
            <Box
              sx={{
                width: '100%',
                justifyContent: 'center',
                display: 'flex',
                py: 1,
              }}
            >
              <CircularProgress size={25} thickness={2} />
            </Box>
          ) : (
            <Button onClick={() => fetchNextPage()} sx={{ borderRadius: 0 }}>
              Load previus message
            </Button>
          )}
        </Stack>
      )}
      <Stack flex={1} direction={'column-reverse'} sx={{ mt: 'auto' }}>
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
      <div ref={bottomRef} />
    </Stack>
  );
}
