import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import signupSVG from '/assets/svgs/signup.svg';
import loginSVG from '/assets/svgs/login.svg';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

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
  height: { xs: 'auto', md: '70%' },
  maxHeight: '550px',
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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleClick = async () => {
    let response: any;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (text === 'Signup' || text === 'Ver Mais' || text === 'Começar Agora') {
      try {
        const { data: signUpData } = await axios.post(
          'http://localhost:8080/auth/signup',
          {
            name,
            email,
            password,
          }
        );
        response = signUpData;
      } catch (error) {
        console.log(error);
      }
    } else {
      const { data: logInData } = await axios.post(
        'http://localhost:8080/auth/login',
        {
          email,
          password,
        }
      );
      response = logInData;
    }
    //check each error
    if (response.errors.length) {
      const errorMessage = response.errors[0].msg.toLowerCase();
      if (errorMessage.includes('name')) {
        return setNameError(response.errors[0].msg);
      } else if (
        errorMessage.includes('email') ||
        errorMessage.includes('user')
      ) {
        return setEmailError(response.errors[0].msg);
      } else if (
        errorMessage.includes('credentials') ||
        errorMessage.includes('password')
      ) {
        return setPasswordError(response.errors[0].msg);
      }
    }
    setUser({
      data: {
        id: response.data.user.id,
        img: response.data.user.img,
        name: response.data.user.name,
        email: response.data.user.email,
        stripeCustomerId: response.data.user.stripeCustomerId,
        isMember: response.data.user.isMember,
      },
      loading: false,
      error: null,
    });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common[
      'authorization'
    ] = `Bearer ${response.data.token}`;
    setOpen(false);
    if (response.data.user.isMember) {
      navigate('/membros/guias');
    } else {
      navigate('/plano');
    }
  };

  const ordinaryStyle = {
    textTransform: 'initial',
    p: '.55rem 1.3rem',
  };

  const guiasStyle = {
    borderRadius: '25px !important',
    padding: '1rem 2rem !important',
    color: '#01244a',
    textTransform: 'uppercase !important',
    fontWeight: 'bold !important',
    backgroundColor: '#fff !important',
    fontSize: '20px !important',
    boxShadow: `5px 5px 0px 0px rgba(215, 215, 255, 0.48) !important`,
    '&:hover': {
      backgroundColor: 'rgba(215, 215, 255, 0.48) !important',
      color: 'white !important',
    },
  };

  return (
    <>
      <Button
        className='signinBtn'
        variant={variant}
        color={color}
        onClick={handleOpen}
        sx={text === 'Começar Agora' ? guiasStyle : ordinaryStyle}
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
                sx={{ letterSpacing: '2px !important' }}
              >
                {text === 'Login'
                  ? 'Fazer Login'
                  : text === 'Ver Mais' || text === 'Começar Agora'
                  ? 'Criar uma Conta'
                  : 'Criar uma Conta'}
              </Typography>
              <Typography
                variant='h6'
                component='p'
                fontSize='16px'
                sx={{ letterSpacing: '2px !important' }}
              >
                {text === 'Login'
                  ? 'Login to your accont'
                  : text === 'Ver Mais' || text === 'Começar Agora'
                  ? 'Sign up now and unlock exclusive access'
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
                    error={nameError ? true : false}
                    helperText={nameError ? nameError : ''}
                    label='Nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                  />
                )}
                <StyledInput
                  error={emailError ? true : false}
                  helperText={emailError ? emailError : ''}
                  label='E-Mail'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <StyledInput
                  error={passwordError ? true : false}
                  helperText={passwordError ? passwordError : ''}
                  label='Senha'
                  type='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
              <Stack
                flexDirection='column'
                useFlexGap
                spacing={1}
                sx={{ mt: 2, width: '80%' }}
              >
                <Button
                  className='signinBtn'
                  variant='contained'
                  color='secondary'
                  sx={{
                    textTransform: 'initial',
                    p: '.55rem 1.3rem',
                    fontSize: '1rem',
                    letterSpacing: '2px !important',
                  }}
                  onClick={handleClick}
                >
                  {text === 'Ver Mais' || text === 'Começar Agora'
                    ? 'Signup'
                    : text}
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
                style={{ width: '100%' }}
              />
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
