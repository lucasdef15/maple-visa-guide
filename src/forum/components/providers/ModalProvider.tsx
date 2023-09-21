import CreateServerModal from '../modals/CreateServerModal';
import { useEffect, useState } from 'react';
import InviteModal from '../modals/InviteModal';
import EditServerModal from '../modals/EditServerModal';
import MembersModal from '../modals/MembersModal';

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
      <MembersModal />
      <EditServerModal />
      <CreateServerModal />
      <InviteModal />
    </>
  );
}
