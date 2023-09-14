import { useState, useCallback } from 'react';
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
import { BiSolidCloudUpload } from 'react-icons/bi';

const formSchema = z.object({
  name: z.string().min(1, 'Server name is required.'),
  imageUrl: z
    .any(z.instanceof(File))
    .refine((file) => file instanceof File && file.size > 0, {
      message: 'Please upload an image file.',
    }),
});

export default function InitialModal() {
  const [open, setOpen] = useState(true);
  const [file, setfile] = useState<any>('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit, formState, register, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: File,
    },
  });

  const isLoading = formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles.map((item: any) =>
          Object.assign(item, { preview: URL.createObjectURL(item) })
        );
        setValue('imageUrl', file[0]);
        setfile(file[0]);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center',
            pt: 3,
            pb: 1,
          }}
          id='customized-dialog-title'
        >
          Customize your server
        </DialogTitle>
        <DialogContent>
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
                    mb: 2,
                    width: '450px',
                    transition: 'all 250ms linear',
                    backgroundImage: `${
                      isDragActive
                        ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23444C727B' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
                        : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2338383852' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
                    }`,
                    '& .draganddrop': {
                      width: '100%',
                      py: '20px',
                      textAlign: 'center',
                      transition: 'all 250ms linear',
                      backgroundColor: `${isDragActive ? '#444c7214' : ''}`,
                      cursor: 'pointer',
                    },
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <div {...getRootProps()} className='draganddrop'>
                    <input {...getInputProps({ ...register('imageUrl') })} />
                    <Stack
                      sx={{
                        pb: 1,
                        '& svg': {
                          width: '50px',
                          height: '50px',
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

                    {file && (
                      <img
                        src={file.preview}
                        alt=''
                        style={{
                          marginTop: '15px',
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                        }}
                      />
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
                {formState.errors.imageUrl?.message && (
                  <Typography sx={{ color: 'tomato', fontSize: '.8rem' }}>
                    {formState.errors.imageUrl?.message}
                  </Typography>
                )}
              </Stack>
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
              <Typography sx={{ color: 'tomato', fontSize: '.8rem' }}>
                {formState.errors.name?.message}
              </Typography>
              <Stack sx={{ pt: 4 }}>
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
      </Dialog>
    </div>
  );
}
