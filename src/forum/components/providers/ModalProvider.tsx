import CreateServerModal from '../modals/CreateServerModal';
import { useEffect, useState } from 'react';
import InviteModal from '../modals/InviteModal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  );
}
