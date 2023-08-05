import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import signupSVG from '/assets/svgs/signup.svg';
import loginSVG from '/assets/svgs/login.svg';

const StyledInput = styled(TextField)(() => ({
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '12px 14px',
  },
  '& .css-1wph9ax-MuiFormLabel-root-MuiInputLabel-root': {
    top: '-3px',
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '55%', md: '100%' },
  height: { xs: '55%', md: '70%' },
  maxWidth: '950px',
  bgcolor: 'background.paper',
  border: '1px solid #00000075',
  boxShadow: 24,
  borderRadius: '25px',
  p: { xs: 0, md: 4 },
  py: { xs: 4 },
  display: 'flex',
  alignItems: 'center',
};

interface ModalProps {
  text: string;
  variant: 'text' | 'outlined' | 'contained';
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}

export default function ModalComponent({ text, variant, color }: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant={variant}
        color={color}
        onClick={handleOpen}
        sx={{ textTransform: 'initial' }}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} component='form'>
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            sx={{ width: '100%', height: '100%' }}
          >
            <Stack
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              sx={{ width: '100%', height: '100%' }}
            >
              <Typography
                id='modal-modal-title'
                fontWeight='bold'
                variant='h6'
                component='h2'
                fontSize='42px'
              >
                {text === 'Login' ? 'Fazer Login' : 'Criar uma Conta'}
              </Typography>
              <Typography variant='h6' component='p' fontSize='16px'>
                {text === 'Login'
                  ? 'Login to your accont'
                  : 'Sign up now and unlock exclusive access'}
              </Typography>
              <Stack
                id='modal-modal-description'
                sx={{ mt: 5, width: '80%' }}
                spacing={3}
              >
                {text === 'Login' ? (
                  ''
                ) : (
                  <StyledInput
                    id='outlined-password-input'
                    label='Nome'
                    type='text'
                  />
                )}
                <StyledInput
                  id='outlined-password-input'
                  label='E-Mail'
                  type='email'
                  autoComplete='current-password'
                />
                <StyledInput
                  id='outlined-password-input'
                  label='Senha'
                  type='password'
                  autoComplete='current-password'
                />
              </Stack>
              <Stack
                flexDirection='column'
                useFlexGap
                spacing={1}
                sx={{ mt: 2, width: '80%' }}
              >
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ textTransform: 'initial' }}
                >
                  {text}
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleClose}
                  sx={{ textTransform: 'initial' }}
                >
                  Close
                </Button>
              </Stack>
            </Stack>
            <Stack
              justifyContent='center'
              alignItems='center'
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                height: '100%',
                scale: '1.5',
                zIndex: '-1',
              }}
            >
              <img
                src={text === 'Signup' ? signupSVG : loginSVG}
                alt='signup'
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
