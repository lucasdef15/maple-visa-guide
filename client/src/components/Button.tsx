import Button from '@mui/material/Button';
import styled from 'styled-components';

interface CotainedButtonProps {
  text: string;
}

const CustomButton = styled(Button)`
  border-radius: ${(props) => props.theme.border.primary} !important;
  background-color: ${(props) => props.theme.light.blue600} !important;
`;

export default function ContainedButton({ text }: CotainedButtonProps) {
  return (
    <CustomButton variant='contained' href='#contained-buttons'>
      {text}
    </CustomButton>
  );
}
