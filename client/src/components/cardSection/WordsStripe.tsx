import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardButtonStyle = styled(Stack)(({ theme }) => ({
  padding: '8px 20px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#ffffffe8',
  color: '#222',
  marginBottom: '15px',

  '@media (max-width: 700px)': {
    flex: '1 1 100px',
  },
}));

export default function WordsStripe() {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='baseline'
      spacing={2}
      sx={{
        marginBottom: 5,
        flexWrap: 'wrap',
        display: { xs: 'none', sm: 'flex' },
        marginInline: { sm: '1rem', md: '0' },
      }}
    >
      <CardButtonStyle>Strategy</CardButtonStyle>
      <CardButtonStyle>Results</CardButtonStyle>
      <CardButtonStyle>Personality</CardButtonStyle>
      <CardButtonStyle>Empower</CardButtonStyle>
      <CardButtonStyle>Optimization</CardButtonStyle>
      <CardButtonStyle
        sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
      >
        Learning
      </CardButtonStyle>
      <CardButtonStyle sx={{ display: { sm: 'none', md: 'block' } }}>
        Collaboration
      </CardButtonStyle>
      <CardButtonStyle
        sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}
      >
        Support
      </CardButtonStyle>
      {/* <CardButtonStyle className='blueLight100'>Communication</CardButtonStyle> */}
      {/* <CardButtonStyle className='blueLight400'>Experience</CardButtonStyle> */}
    </Stack>
  );
}
