import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: '1rem 2rem',
  color: 'white',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  backgroundColor: theme.palette.common.black,
  fontSize: '20px',
  boxShadow: `5px 5px 0px 0px ${theme.palette.primary.dark}`,
}));

export default function GuiasButton() {
  return <StyledButton variant='contained'>explorar mais</StyledButton>;
}
