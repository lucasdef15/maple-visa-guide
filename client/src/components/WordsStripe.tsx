import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardButtonStyle = styled('span')(({ theme }) => ({
  color: theme.palette.common.white,
  padding: '8px 20px',
  borderRadius: theme.shape.borderRadius,
}));

export default function WordsStripe() {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={2}
      sx={{ marginBlock: 5 }}
    >
      <CardButtonStyle className='blueLight100'>Strategy</CardButtonStyle>
      <CardButtonStyle className='blueLight300'>Results</CardButtonStyle>
      <CardButtonStyle className='blueLight400'>Personality</CardButtonStyle>
      <CardButtonStyle className='blueLight500'>Empower</CardButtonStyle>
      <CardButtonStyle className='blueLight100'>Optimization</CardButtonStyle>
      <CardButtonStyle className='blueLight300'>Learning</CardButtonStyle>
      <CardButtonStyle className='blueLight400'>Collaboration</CardButtonStyle>
      <CardButtonStyle className='blueLight500'>Support</CardButtonStyle>
      {/* <CardButtonStyle className='blueLight100'>Communication</CardButtonStyle> */}
      {/* <CardButtonStyle className='blueLight400'>Experience</CardButtonStyle> */}
    </Stack>
  );
}
