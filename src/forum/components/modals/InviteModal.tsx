import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { IconButton, FormControl, Stack, Button } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';
import { useModal } from '../../hooks/use-modal-store';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { LuCopy } from 'react-icons/lu';
import { LuCopyCheck } from 'react-icons/lu';
import { FiRefreshCw } from 'react-icons/fi';
import { useOrigin } from '../../hooks/use-origin';
import { useContext, useState } from 'react';
import axios from 'axios';
import config from '../../../utilities/config';
import { DarkModeContext } from '../../../contexts/DarkModeContext';

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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { darkMode } = useContext(DarkModeContext);

  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const { server } = data;

  const isModalOpen = isOpen && type === 'invite';

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${config.APP_BASE_URL}/server/${server?.id}/invite-code`
      );
      onOpen('invite', { server: response?.data.data.server });
    } catch (error) {
      console.error(error);
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
            Invite Friends
          </DialogTitle>
          <DialogContent sx={{ mb: 2.5, width: '100%' }}>
            <FormControl
              variant='standard'
              sx={{
                marginTop: 3.5,
                marginBottom: 1.5,
                width: '100%',
                display: 'flex',
                placeItems: 'center',
              }}
            >
              <InputLabel
                htmlFor='invite-link'
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  top: '-25px',
                }}
              >
                Server Invite Link
              </InputLabel>
              <Stack direction={'row'} spacing={1}>
                <BootstrapInput
                  disabled={isLoading}
                  value={inviteUrl}
                  id='invite-link'
                  sx={{ width: { xs: '345px', sm: '395px' } }}
                />
                <IconButton
                  sx={{ alignSelf: 'center' }}
                  onClick={onCopy}
                  disabled={isLoading}
                >
                  {copied ? <LuCopyCheck /> : <LuCopy />}
                </IconButton>
              </Stack>
            </FormControl>
            <Button
              disabled={isLoading}
              onClick={onNew}
              sx={{
                textTransform: 'unset',
                color: darkMode ? 'white' : '#222',
                '& svg': {
                  width: 20,
                  height: 20,
                },
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: 'hsla(0, 0%, 100%, 0.062)',
                },
              }}
              endIcon={<FiRefreshCw />}
            >
              Generate A New Link
            </Button>
          </DialogContent>
        </BootstrapDialog>
      </AnimatePresence>
    </div>
  );
}
