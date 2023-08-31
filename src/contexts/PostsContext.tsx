import { createContext, useState } from 'react';
import axios from 'axios';
import config from '../utilities/config';

export interface PostProps {
  id?: string;
  title: string;
  img: string;
  desc: string;
}

interface PostsContextValue {
  posts: PostProps[];
  setPost: React.Dispatch<React.SetStateAction<PostProps[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchpost: (cat: any) => Promise<void>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const PostsContext = createContext<PostsContextValue>({} as PostsContextValue);

export function PostsDataProvider({ children }: any) {
  const [posts, setPost] = useState<PostProps[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchpost = async (cat: any) => {
    try {
      const { data: response } = await axios.get(
        `${config.APP_BASE_URL}/posts${cat}`
      );
      setPost(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPost,
        loading,
        setLoading,
        fetchpost,
        query,
        setQuery,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsContext;
