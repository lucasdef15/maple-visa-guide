import CreateServerModal from '../modals/CreateServerModal';
import { useEffect, useState } from 'react';
import InviteModal from '../modals/InviteModal';
import EditServerModal from '../modals/EditServerModal';
import MembersModal from '../modals/MembersModal';
import CreateChannelModal from '../modals/CreateChannelModal';
import LeaveServerModal from '../modals/LeaveServerModal';
import DeleteServerModal from '../modals/DeleteServerModal';
import DeleteChannelModal from '../modals/DeleteChannelModal';
import EditChannelModal from '../modals/EditChannelModal';
import MessageFileModal from '../modals/MessageFileModal';
import DeleteMessageModal from '../modals/DeleteMessageModal';

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
      <DeleteMessageModal />
      <MessageFileModal />
      <EditChannelModal />
      <DeleteChannelModal />
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
