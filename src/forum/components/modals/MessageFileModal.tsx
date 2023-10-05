import { useState, useCallback, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FormControl, Stack, Typography, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFilePdf } from 'react-icons/fa';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { BiSolidFileDoc } from 'react-icons/bi';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useModal } from '../../hooks/use-modal-store';
import { DarkModeContext } from '../../../contexts/DarkModeContext';

const formSchema = z.object({
  file: z
    .any(z.instanceof(File))
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'Please upload an image file.',
    }),
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    paddingInline: theme.spacing(5),
    paddingBottom: theme.spacing(0.5),
  },
  '& .MuiPaper-root': {
    maxWidth: '550px',
    minWidth: '380px',
    borderRadius: '15px',
  },
}));

export default function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModal();
  const [file, setfile] = useState<any>(null);

  const isModalOpen = isOpen && type === 'messageFile';
  const { apiUrl, query } = data;

  const { darkMode } = useContext(DarkModeContext);

  const { handleSubmit, formState, register, setValue, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: File,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles.map((item: any) =>
          Object.assign(item, { preview: URL.createObjectURL(item) })
        );
        setValue('file', file[0]);
        setfile(file[0]);
      }
    },
    [setValue]
  );

  const handleDeleteServerImg = () => {
    setValue(
      'file',
      {} as {
        new (
          fileBits: BlobPart[],
          fileName: string,
          options?: FilePropertyBag | undefined
        ): File;
        prototype: File;
      }
    );
    setfile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const isLoading = formState.isSubmitting;

  const handleClose = () => {
    onClose();
    handleDeleteServerImg();
    reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('serverId', query?.serverId);
    formData.append('channelId', query?.channelId);
    formData.append('file', values.file);

    const configHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post(apiUrl as string, formData, configHeader);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AnimatePresence>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={isModalOpen}
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
            Add an attachent
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DialogContentText sx={{ textAlign: 'center' }}>
              Send a file as a message
            </DialogContentText>
            <FormControl
              sx={{
                py: 3,
                width: '100%',
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                {file ? (
                  <Stack sx={{ width: '100%' }} alignItems={'center'}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                    >
                      {file && (
                        <Stack
                          sx={{
                            pb: 1,
                            position: 'relative',
                          }}
                        >
                          <IconButton
                            aria-label='delete'
                            onClick={handleDeleteServerImg}
                            sx={{
                              position: 'absolute',
                              right: file.type.includes('image') ? -10 : 0,
                              top: file.type.includes('image') ? 0 : 2,
                              background: 'tomato',
                              color: 'white',
                              '& svg': {
                                width: '20px',
                                height: '20px',
                              },
                              '&:hover': {
                                background: '#222222ae',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          {file.type === 'application/pdf' ? (
                            <>
                              <Stack
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{
                                  width: '100px',
                                  height: '100px',
                                  background: '#1212121c',
                                  borderRadius: '50%',
                                  fontSize: '3rem',
                                  mb: 3,
                                }}
                              >
                                <FaFilePdf />
                              </Stack>
                              <Stack
                                direction={'row'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                }}
                              >
                                <span
                                  style={{
                                    whiteSpace: 'nowrap',
                                    paddingRight: '7px',
                                  }}
                                >
                                  File name:
                                </span>

                                <Box
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.mode === 'dark'
                                        ? '#7979da'
                                        : '#5252ff',
                                    whiteSpace: 'nowrap',
                                    fontSize: '.9rem',
                                  }}
                                >
                                  {file.name}
                                </Box>
                              </Stack>
                            </>
                          ) : file.type !== 'application/pdf' &&
                            !file.type.includes('image') ? (
                            <>
                              <Stack
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{
                                  width: '100px',
                                  height: '100px',
                                  background: '#1212121c',
                                  borderRadius: '50%',
                                  fontSize: '3rem',
                                  mb: 3,
                                }}
                              >
                                <BiSolidFileDoc />
                              </Stack>
                              <Stack
                                direction={'row'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                }}
                              >
                                <span
                                  style={{
                                    whiteSpace: 'nowrap',
                                    paddingRight: '7px',
                                  }}
                                >
                                  File name:
                                </span>

                                <Box
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.mode === 'dark'
                                        ? '#7979da'
                                        : '#5252ff',
                                    whiteSpace: 'nowrap',
                                    fontSize: '.9rem',
                                  }}
                                >
                                  {file.name}
                                </Box>
                              </Stack>
                            </>
                          ) : (
                            <motion.img
                              src={file.preview}
                              alt=''
                              style={{
                                marginTop: '15px',
                                width: '150px',
                                height: '150px',
                                borderRadius: '5px',
                                objectFit: 'cover',
                              }}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                            />
                          )}
                        </Stack>
                      )}
                    </motion.div>
                  </Stack>
                ) : (
                  <Stack
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Stack
                      sx={{
                        mb: 1,
                        width: '450px',
                        transition: 'all 250ms linear',
                        backgroundImage: `${
                          isDragActive
                            ? darkMode
                              ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23FFFFFF2B' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
                              : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23444C727B' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
                            : darkMode
                            ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%237979DAFF' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
                            : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%235252FFFF' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
                        }`,
                        '& .draganddrop': {
                          width: '100%',
                          py: '20px',
                          textAlign: 'center',
                          transition: 'all 250ms linear',
                          backgroundColor: `${isDragActive ? '#444c7214' : ''}`,
                          cursor: 'pointer',
                          borderRadius: '15px',
                        },
                      }}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <div {...getRootProps()} className='draganddrop'>
                        <input {...getInputProps({ ...register('file') })} />
                        <Stack
                          sx={{
                            pb: 1,
                            '& svg': {
                              width: '40px',
                              height: '40px',
                              transition: 'color 250ms linear',
                              color: isDragActive
                                ? darkMode
                                  ? '#FFFFFF61'
                                  : '#444c727b'
                                : darkMode
                                ? '#7979da'
                                : '#5252ff',
                            },
                          }}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <BsFillFileEarmarkImageFill />
                        </Stack>
                        <Typography
                          variant='h5'
                          color={
                            isDragActive
                              ? darkMode
                                ? '#FFFFFF61'
                                : '#444c727b'
                              : (theme) => theme.palette.text.secondary
                          }
                          fontWeight={'bold'}
                          fontSize={19}
                        >
                          Message File
                        </Typography>
                        {isDragActive ? (
                          <Typography
                            sx={{
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#7979da'
                                  : '#222222ab',

                              fontWeight: '800',
                            }}
                          >
                            Drop the file here...
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? '#7979da'
                                  : '#5252ff',
                            }}
                          >
                            Drag and drop some files here, click to select files
                          </Typography>
                        )}

                        <Stack alignItems={'center'}>
                          <Button
                            variant='outlined'
                            startIcon={<BiSolidCloudUpload />}
                            sx={{
                              textTransform: 'unset',
                              width: '125px',
                              mt: 2,
                              color: isDragActive
                                ? darkMode
                                  ? '#FFFFFF61'
                                  : '#444c727b'
                                : darkMode
                                ? '#7979da'
                                : '#5252ff',
                              borderColor: isDragActive
                                ? darkMode
                                  ? '#FFFFFF61'
                                  : '#444c727b'
                                : darkMode
                                ? '#7979da'
                                : '#5252ff',
                            }}
                          >
                            Upload
                          </Button>
                        </Stack>
                      </div>
                    </Stack>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {formState.errors.file?.message && (
                        <motion.div
                          className='shake'
                          initial={{ x: 0 }}
                          animate={{
                            x: [-10, 10, -10, 10, 0],
                            transition: { duration: 0.5 },
                          }} // Shake animation
                        >
                          <Typography
                            sx={{ color: 'tomato', fontSize: '.8rem' }}
                          >
                            {formState.errors.file?.message}
                          </Typography>
                        </motion.div>
                      )}
                    </motion.div>
                  </Stack>
                )}
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
                    Send
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
