import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { IconButton, Stack, Button, DialogContentText } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import { useModal } from '../../hooks/use-modal-store';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';
import axios from 'axios';
import config from '../../../utilities/config';
import qs from 'query-string';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { ForumContext } from '../../../contexts/ForumContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingInline: theme.spacing(5),
    paddingBottom: theme.spacing(0.5),
  },
  '& .MuiPaper-root': {
    maxWidth: '550px',
    borderRadius: '15px',
  },
}));

export default function DeleteChannelModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { darkMode } = useContext(DarkModeContext);
  const { setIsServerLoading, fetchServers, setServers } =
    useContext(ForumContext);

  const { isOpen, onClose, type, data } = useModal();

  const { server, channel } = data;

  const isModalOpen = isOpen && type === 'deleteChannel';

  const onLeaveServer = async () => {
    try {
      setIsLoading(true);
      setIsServerLoading(true);
      const url = qs.stringifyUrl({
        url: `${config.APP_BASE_URL}/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);
      await fetchServers(setServers);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        <BootstrapDialog
          aria-labelledby='customized-dialog-title'
          open={isModalOpen}
          onClose={onClose}
        >
          <IconButton
            aria-label='delete'
            onClick={onClose}
            sx={{ position: 'absolute', right: 5, top: 5 }}
          >
            <AiOutlineClose />
          </IconButton>
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              textAlign: 'center',
              pt: 3,
              pb: 0,
            }}
            id='customized-dialog-title'
          >
            Delete Channel
          </DialogTitle>
          <DialogContent sx={{ mb: 2.5, width: '100%' }}>
            <DialogContentText sx={{ textAlign: 'center' }}>
              Are you sure you want to do this?
              <br />
              <span
                style={{
                  color: darkMode ? 'rgb(129 140 248)' : 'rgb(79 70 229)',
                  fontWeight: 'bold',
                }}
              >
                #{channel?.name}
              </span>{' '}
              will be permanently deleted.
            </DialogContentText>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ width: '100%', mt: 3 }}
            >
              <Button
                variant='outlined'
                disabled={isLoading}
                onClick={onClose}
                sx={{
                  color: darkMode ? '#fff' : '',
                  borderColor: darkMode ? '#fff' : '',
                  '&:hover': {
                    borderColor: darkMode ? '#ffffff47' : '',
                    color: darkMode ? '#ffffffba' : '',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                disabled={isLoading}
                onClick={onLeaveServer}
                sx={{ background: '#222' }}
              >
                Confirm
              </Button>
            </Stack>
          </DialogContent>
        </BootstrapDialog>
      </AnimatePresence>
    </div>
  );
}
