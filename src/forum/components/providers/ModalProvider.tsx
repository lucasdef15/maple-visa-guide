import CreateServerModal from '../modals/CreateServerModal';
import { useEffect, useState } from 'react';
import InviteModal from '../modals/InviteModal';
import EditServerModal from '../modals/EditServerModal';
import MembersModal from '../modals/MembersModal';
import CreateChannelModal from '../modals/createChannelModal';
import LeaveServerModal from '../modals/LeaveServerModal';
import DeleteServerModal from '../modals/DeleteServerModal';

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
      <DeleteServerModal />
      <LeaveServerModal />
      <CreateChannelModal />
      <MembersModal />
      <EditServerModal />
      <CreateServerModal />
      <InviteModal />
    </>
  );
}
