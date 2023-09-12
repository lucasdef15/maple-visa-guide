import { createContext, useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import config from '../utilities/config';

export interface User {
  data: {
    id: string;
    email: string;
    name: string;
    img: string;
    stripeCustomerId: string;
    isMember: number;
  } | null;
  error: string | null;
  loading: boolean;
}
interface DecodedToken {
  role: string;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: (navigate: NavigateFunction) => void;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: User = {
  data: null,
  loading: true,
  error: null,
};

const UserContext = createContext<UserContextValue>({
  user: initialState,
  setUser: () => {},
  handleLogout: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(initialState);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  if (token) {
    //set all of request headers to have this configuration
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get(
      `${config.APP_BASE_URL}/auth/me`
    );

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          img: response.data.user.img,
          stripeCustomerId: response.data.user.stripeCustomerId,
          isMember: response.data.user.isMember,
        },
        loading: false,
        error: null,
      });
    } else if (response.data && response.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: response.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, [token]);

  const handleLogout = (navigate: NavigateFunction) => {
    setUser({ data: null, loading: false, error: null });
    localStorage.removeItem('token');

    navigate('/');
  };

  const contextValue: UserContextValue = {
    user,
    setUser,
    handleLogout,
    isAdmin,
    setIsAdmin,
  };
  useEffect(() => {
    try {
      const decodedToken = jwt_decode(token as string) as DecodedToken;
      const userRole = decodedToken.role;

      userRole === 'ADMIN' ? setIsAdmin(true) : setIsAdmin(false);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  console.log(user);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
