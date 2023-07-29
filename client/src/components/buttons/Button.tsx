import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CotainedButtonProps {
  text: string;
}

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  padding: '0.7rem 1.8rem',
}));

export default function ContainedButton({ text }: CotainedButtonProps) {
  return (
    <CustomButton variant='contained' href='#contained-buttons'>
      <Typography fontWeight='bold'>{text}</Typography>
    </CustomButton>
  );
}
