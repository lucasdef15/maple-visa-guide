import { useContext, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import {
  FormControl,
  Stack,
  Typography,
  Button,
  InputBase,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineClose } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import config from '../../../utilities/config';
import { useModal } from '../../hooks/use-modal-store';
import { ForumContext } from '../../../contexts/ForumContext';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ChannelType } from '../../../../types';
import qs from 'query-string';

const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Channel name is required.')
    .refine((name) => name !== 'general', {
      message: 'Channel name cannnot be "general"',
    }),
  type: z.nativeEnum(ChannelType),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingInline: theme.spacing(5),
    paddingBottom: theme.spacing(0.5),
  },
  '& .MuiPaper-root': {
    maxWidth: '550px',
    minWidth: '350px',
    borderRadius: '15px',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff30' : '#2222221d',
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff52' : '#22222242',
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function EditChannelModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { setServers, fetchServers, setIsServerLoading } =
    useContext(ForumContext);

  const isModalOpen = isOpen && type === 'editChannel';
  const { channel, server } = data;

  const { control, handleSubmit, formState, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: ChannelType.TEXT,
    },
  });

  const isLoading = formState.isSubmitting;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedValues = {
      ...values,
      type: ChannelType[values.type],
    };

    try {
      setIsServerLoading(true);
      const url = qs.stringifyUrl({
        url: `${config.APP_BASE_URL}/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(url, updatedValues);
      await fetchServers(setServers);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (channel) {
      setValue('name', channel?.name);
      setValue('type', ChannelType[channel?.type] as unknown as ChannelType);
    }
  }, [channel, setValue]);

  return (
    <div>
      <AnimatePresence>
        <BootstrapDialog
          aria-labelledby='customized-dialog-title'
          open={isModalOpen}
          onClose={handleClose}
        >
          <IconButton
            aria-label='delete'
            onClick={handleClose}
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
            Edit Channel
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl
              sx={{
                pb: 3,
                width: '100%',
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin='dense'
                      id='name'
                      label='Channel Name'
                      type='text'
                      fullWidth
                      variant='standard'
                      {...field}
                    />
                  )}
                />
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {formState.errors.name?.message && (
                    <motion.div
                      className='shake'
                      initial={{ x: 0 }}
                      animate={{
                        x: [-10, 10, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }} // Shake animation
                    >
                      <Typography sx={{ color: 'tomato', fontSize: '.8rem' }}>
                        {formState.errors.name?.message}
                      </Typography>
                    </motion.div>
                  )}
                </motion.div>
                <FormControl variant='standard' sx={{ minWidth: 120, my: 2 }}>
                  <Controller
                    name='type'
                    control={control}
                    render={({ field }) => (
                      <>
                        <InputLabel id='channelTypeLabel'>
                          Channel Type
                        </InputLabel>
                        <Select
                          labelId='channelTypeLabel'
                          id='channelTypeLabel'
                          disabled={isLoading}
                          label='channel type'
                          input={<BootstrapInput />}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                borderRadius: '5px',
                              },
                            },
                          }}
                          {...field}
                        >
                          <StyledMenuItem value={0}>Text</StyledMenuItem>
                          <StyledMenuItem value={1}>Audio</StyledMenuItem>
                          <StyledMenuItem value={2}>Video</StyledMenuItem>
                        </Select>
                      </>
                    )}
                  />
                </FormControl>
                <Stack sx={{ pt: 2.5 }}>
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isLoading}
                    sx={{
                      background: '#222',
                      textTransform: 'unset',
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </form>
            </FormControl>
          </DialogContent>
        </BootstrapDialog>
      </AnimatePresence>
    </div>
  );
}
