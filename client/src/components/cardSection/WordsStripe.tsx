import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardButtonStyle = styled('span')(({ theme }) => ({
  padding: '8px 20px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#ffffffe8',
  color: '#222',
}));

export default function WordsStripe() {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={2}
      sx={{
        marginBottom: 5,
        flexWrap: 'wrap',
        display: { xs: 'none', sm: 'flex' },
      }}
    >
      <CardButtonStyle>Strategy</CardButtonStyle>
      <CardButtonStyle>Results</CardButtonStyle>
      <CardButtonStyle>Personality</CardButtonStyle>
      <CardButtonStyle>Empower</CardButtonStyle>
      <CardButtonStyle>Optimization</CardButtonStyle>
      <CardButtonStyle>Learning</CardButtonStyle>
      <CardButtonStyle>Collaboration</CardButtonStyle>
      <CardButtonStyle>Support</CardButtonStyle>
      {/* <CardButtonStyle className='blueLight100'>Communication</CardButtonStyle> */}
      {/* <CardButtonStyle className='blueLight400'>Experience</CardButtonStyle> */}
    </Stack>
  );
}
