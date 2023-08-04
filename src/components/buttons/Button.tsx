import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CotainedButtonProps {
  text: string;
}

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundImage: 'linear-gradient(45deg, #000046 0%, #1CB5E0 90%)',
  padding: '0.7rem 1.8rem',
  transition: 'background-image 1s ease-in-out',
  '&:hover': {
    backgroundImage: 'linear-gradient(60deg, #000046 0%, #1CB5E0 90%)',
  },
  position: 'static',
  // zIndex: -1,
}));

export default function ContainedButton({ text }: CotainedButtonProps) {
  return (
    <CustomButton variant='contained' href='#contained-buttons'>
      <Typography fontWeight='bold'>{text}</Typography>
    </CustomButton>
  );
}
