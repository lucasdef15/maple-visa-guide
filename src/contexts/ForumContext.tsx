import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utilities/config';

interface ForumContextValue {
  servers: any;
  setServers: React.Dispatch<React.SetStateAction<any>>;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  fetchServers: (
    setServers: React.Dispatch<React.SetStateAction<any>>
  ) => Promise<void>;
  isServerLoading: boolean;
  setIsServerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isNavigationSidebarLoading: boolean;
  setIsNavigationSidebarLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rerenderServerSideBar: boolean;
  setRerenderServerSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  isChannelLoading: boolean;
  setIsChannelLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForumContext = createContext<ForumContextValue>({} as ForumContextValue);

const ForumProvider = ({ children }: any) => {
  const [servers, setServers] = useState<any>([]);
  const [profile, setProfile] = useState<any>({});
  const [isServerLoading, setIsServerLoading] = useState<boolean>(false);
  const [isNavigationSidebarLoading, setIsNavigationSidebarLoading] =
    useState<boolean>(true);
  const [rerenderServerSideBar, setRerenderServerSideBar] =
    useState<boolean>(true);
  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false);

  const fetchServers = async (
    setServers: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const response = await axios.get(`${config.APP_BASE_URL}/server`);

    setServers(response.data.servers);
  };

  useEffect(() => {
    fetchServers(setServers);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/profile/current`
        );
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const contextValue: ForumContextValue = {
    servers,
    setServers,
    fetchServers,
    profile,
    setProfile,
    isServerLoading,
    setIsServerLoading,
    isNavigationSidebarLoading,
    setIsNavigationSidebarLoading,
    rerenderServerSideBar,
    setRerenderServerSideBar,
    isChannelLoading,
    setIsChannelLoading,
  };

  return (
    <ForumContext.Provider value={contextValue}>
      {children}
    </ForumContext.Provider>
  );
};

export { ForumContext, ForumProvider };
