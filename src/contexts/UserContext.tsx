import { createContext, useState, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';

export interface User {
  data: {
    id: string;
    email: string;
    name: string;
    img: string;
    stripeCustomerId: string;
  } | null;
  error: string | null;
  loading: boolean;
}

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleLogout: (navigate: NavigateFunction) => void;
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
});

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(initialState);

  const token = localStorage.getItem('token');

  if (token) {
    //set all of request headers to have this configuration
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get('http://localhost:8080/auth/me');

    if (response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          img: response.data.user.img,
          stripeCustomerId: response.data.user.stripeCustomerId,
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
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
