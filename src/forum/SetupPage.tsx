import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../utilities/config';
import { Navigate } from 'react-router-dom';
import InitialModal from './components/modals/InitialModal';

export default function SetupPage() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${config.APP_BASE_URL}/initialprofile`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  if (data?.data?.server) {
    return <Navigate to={`/membros/forum/servers/${data.data.server.id}`} />;
  }

  return (
    <>
      <InitialModal />
    </>
  );
}
