import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  data: {
    id: string;
    email: string;
    name: string;
    stripeCustomerId: string;
  } | null;
  error: string | null;
  loading: boolean;
}

const initialState: User = {
  data: null,
  loading: true,
  error: null,
};

const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([initialState, () => {}]);

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

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
