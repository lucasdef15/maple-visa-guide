import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });

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
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Strategy
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Results
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Personality
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Empower
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Optimization
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block' },
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Learning
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          display: { sm: 'none', md: 'block' },
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Collaboration
      </CardButtonStyle>
      <CardButtonStyle
        ref={ref}
        className={inView ? 'fromTop' : ''}
        sx={{
          display: { xs: 'none', md: 'none', lg: 'block' },
          opacity: 0,
          top: '-99px',
          position: 'relative',
        }}
      >
        Support
      </CardButtonStyle>
    </Stack>
  );
}
