import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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
  return <StyledButton variant='contained'>explorar mais</StyledButton>;
}
