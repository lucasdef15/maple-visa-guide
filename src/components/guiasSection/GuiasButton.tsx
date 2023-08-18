import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: '1rem 2rem',
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  backgroundColor: theme.palette.common.white,
  fontSize: '20px',
  boxShadow: `5px 5px 0px 0px rgba(215, 215, 255, 0.48)`,
  '&:hover': {
    backgroundColor: 'rgba(215, 215, 255, 0.48)',
    color: 'white',
  },
}));

export default function GuiasButton() {
  return (
    <Link to={'plano'} style={{ width: 'auto' }}>
      <StyledButton variant='contained'>Começar Agora</StyledButton>
    </Link>
  );
}
