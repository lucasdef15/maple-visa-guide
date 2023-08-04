import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

const StyledForm = styled('form')(({ theme }) => ({
  '&': {
    paddingInline: '1rem',
  },
  '& legend': {
    paddingInline: '.5rem',
    marginLeft: '.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
  },
  '& label': {
    position: 'relative',
    left: -99999,
  },
  '& fieldset': {
    padding: '0 0',
    height: '55px',
    borderRadius: '5px',
    border: '1px solid #00000044',
    marginBottom: '.8rem',
  },
  '& input': {
    width: '100%',
    position: 'relative',
    top: '-20px',
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    padding: '.3rem 1rem',
  },
  '& input:focus-visible': {
    outline: 'none',
    border: 'none',
  },
  '& fieldset:focus-within': {
    border: `1.5px solid ${theme.palette.secondary.dark}`,
  },
  '& #textField': {
    height: '150px',
  },
  '& #textField #message': {
    width: '100%',
    height: 'calc(100% - 20px)',
    padding: '0 1rem',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    resize: 'none',
    position: 'relative',
    top: '-10px',
  },
  '& #textField #message:focus-visible': {
    outline: 'none',
    border: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  width: '100%',
  height: '50px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'unset',
  backgroundColor: theme.palette.secondary.dark,
}));

export default function ContactForm() {
  return (
    <StyledForm>
      <fieldset>
        <legend>E-Mail</legend>
        <label htmlFor='email'>email</label>
        <input type='email' id='email' />
      </fieldset>
      <Stack
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={'space-between'}
      >
        <fieldset>
          <legend>Nome</legend>
          <label htmlFor='name'>nome</label>
          <input type='text' id='name' />
        </fieldset>
        <fieldset>
          <legend>Telefone</legend>
          <label htmlFor='phone'>telefone</label>
          <input type='text' id='phone' />
        </fieldset>
      </Stack>
      <fieldset id='textField'>
        <legend>Menssagem</legend>
        <label htmlFor='message'>mensagem</label>
        <textarea id='message' />
      </fieldset>
      <StyledButton
        variant='contained'
        startIcon={<MdOutlineMarkEmailUnread />}
        sx={{ mt: { xs: '25px', sm: '20px' } }}
      >
        Enviar
      </StyledButton>
    </StyledForm>
  );
}
