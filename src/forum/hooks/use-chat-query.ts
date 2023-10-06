import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSocket } from '../../contexts/SocketProvider';

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: 'channelId' | 'conversationId';
  paramValue: string;
  bearerToken: string;
}

export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
  bearerToken,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );

    const headers = {
      Authorization: `Bearer ${bearerToken}`,
    };

    const res = await fetch(url, { headers });
    return res.json();
  };


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
