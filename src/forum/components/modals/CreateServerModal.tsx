import { useState, useCallback, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { FormControl, Stack, Typography, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { BsFillFileEarmarkImageFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import config from '../../../utilities/config';
import { useModal } from '../../hooks/use-modal-store';
import { ForumContext } from '../../../contexts/ForumContext';

const formSchema = z.object({
  name: z.string().min(1, 'Server name is required.'),
  image: z
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
    borderRadius: '15px',
  },
}));

export default function CreateServerModal() {
  const [file, setfile] = useState<any>(null);
  const { isOpen, onClose, type } = useModal();
  const {
    setServers,
    fetchServers,
    setIsNavigationSidebarLoading,
    isNavigationSidebarLoading,
  } = useContext(ForumContext);

  const isModalOpen = isOpen && type === 'createServer';

  const { control, handleSubmit, formState, register, setValue, reset } =
    useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        image: File,
      },
    });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles.map((item: any) =>
          Object.assign(item, { preview: URL.createObjectURL(item) })
        );
        setValue('image', file[0]);
        setfile(file[0]);
      }
    },
    [setValue]
  );

  const handleDeleteServerImg = () => {
    setValue(
      'image',
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
    reset();
    onClose();
    setfile(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('img', values.image);

    const configHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post(`${config.APP_BASE_URL}/server`, formData, configHeader);
      await fetchServers(setServers);
      reset();
      onClose();
      setfile(null);
      setIsNavigationSidebarLoading(!isNavigationSidebarLoading);
    } catch (error) {
      console.error(error);
    }
  };

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
            Customize your server
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
              Give your server a personality with a name and an image. You can
              always change it later
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
                              right: -5,
                              top: 15,
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
                          <motion.img
                            src={file.preview}
                            alt=''
                            style={{
                              marginTop: '15px',
                              width: '100px',
                              height: '100px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          />
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
                            ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23444C727B' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
                            : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%2322222275' stroke-width='4' stroke-dasharray='10%2c 11' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");border-radius: 15px;`
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
                        <input {...getInputProps({ ...register('image') })} />
                        <Stack
                          sx={{
                            pb: 1,
                            '& svg': {
                              width: '40px',
                              height: '40px',
                              transition: 'color 250ms linear',
                              color: isDragActive ? '#444c727b' : '#000088',
                            },
                          }}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >
                          <BsFillFileEarmarkImageFill />
                        </Stack>
                        <Typography
                          variant='h5'
                          color={isDragActive ? '#444c727b' : 'primary'}
                          fontWeight={'bold'}
                          fontSize={19}
                        >
                          Server Image
                        </Typography>
                        {isDragActive ? (
                          <Typography sx={{ color: '#222222ab' }}>
                            Drop the file here...
                          </Typography>
                        ) : (
                          <Typography sx={{ color: '#222222ab' }}>
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
                              color: isDragActive ? '#444c727b' : '',
                              borderColor: isDragActive ? '#444c727b' : '',
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
                      {formState.errors.image?.message && (
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
                            {formState.errors.image?.message}
                          </Typography>
                        </motion.div>
                      )}
                    </motion.div>
                  </Stack>
                )}

                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      margin='dense'
                      id='name'
                      label='Server Name'
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
                <Stack sx={{ pt: 2.5 }}>
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isLoading}
                    sx={{
                      background: '#222',
                      textTransform: 'unset',
                      // width: '150px',
                    }}
                  >
                    Create
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
