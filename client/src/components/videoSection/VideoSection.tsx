import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import blog from '/assets/svgs/blog.svg';
import experiencia from '/assets/svgs/experiencia.svg';
import valiosa from '/assets/svgs/valiosa.svg';
import Button from '../buttons/Button';
import Video from './Video';
import { Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const StyledSection = styled('div')(() => ({
  marginBlock: '200px',
  counterReset: 'my-counter',
  '@media (max-width: 1194px)': {
    textAlign: 'center',
    paddingBlock: '1rem',
    marginBlock: '50px',
  },
}));

const StyledCard = styled('div')(({ theme }) => ({
  backgroundColor: '#00009914',
  borderRadius: theme.shape.borderRadius,
  width: '155px',
  height: '150px',
  position: 'relative',
  display: 'grid',
  placeContent: 'center',

  '@media (max-width: 1194px)': {
    textAlign: 'center',
    width: '125px',
    height: '120px',
  },
  '@media (max-width: 768px)': {
    width: '100px',
    height: '95px',
  },

  '&::before': {
    content: 'counter(my-counter)',
    counterIncrement: 'my-counter',
    position: 'absolute',
    left: '-5px',
    top: '-5px',
    width: '50px',
    height: '50px',
    fontSize: '32px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      fontSize: '25px',
    },
  },
  '& img': {
    width: '50px',
    height: '50px',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
    },
  },
}));

const ButtonWrapper = styled('div')(() => ({
  marginBlock: '25px',
  '@media (max-width: 1194px)': {
    marginTop: '45px',
  },
}));

export default function VideoSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });
  return (
    <StyledSection className='spacing'>
      <Stack
        direction={{ xs: 'column', md: 'column', lg: 'row' }}
        spacing={[5, 3]}
        justifyContent='space-between'
      >
        <Stack justifyContent='space-between'>
          <Typography
            className={inView ? 'slideOut' : ''}
            sx={{
              fontSize: 'clamp(34px, 6vw, 48px)',
              opacity: 0,
              left: '-99px',
              position: 'relative',
            }}
            fontWeight='bold'
            color='primary.dark'
          >
            Apoio em Cada Etapa!
          </Typography>
          <Typography
            ref={ref}
            className={inView ? 'slideOut' : ''}
            sx={{
              fontSize: 'clamp(15px, 1.5vw, 16px)',
              opacity: 0,
              left: '-99px',
              position: 'relative',
            }}
            color='text.secondary'
          >
            Estamos aqui para ajudar você em cada etapa do proceso
          </Typography>
          <ButtonWrapper>
            <Button text='Ver Mais' />
          </ButtonWrapper>
        </Stack>
        <Stack
          direction='row'
          justifyContent='center'
          spacing={3}
          sx={{
            zIndex: -1,
            whiteSpace: 'nowrap',
            fontSize: { xs: '13px', sm: '16px' },
          }}
        >
          <Stack alignItems='center'>
            <StyledCard>
              <img src={experiencia} alt='experiencia' />
            </StyledCard>
            <Typography
              color='text.secondary'
              sx={{ marginTop: '5px', fontSize: { xs: '14px', sm: '16px' } }}
            >
              Experiência única
            </Typography>
          </Stack>
          <Stack alignItems='center'>
            <StyledCard>
              <img src={valiosa} alt='valiosa' />
            </StyledCard>
            <Typography
              color='text.secondary'
              sx={{ marginTop: '5px', fontSize: { xs: '13px', sm: '16px' } }}
            >
              Dicas valiosas
            </Typography>
          </Stack>
          <Stack alignItems='center'>
            <StyledCard>
              <img src={blog} alt='blog' />
            </StyledCard>
            <Typography
              color='text.secondary'
              sx={{ marginTop: '5px', fontSize: { xs: '13px', sm: '16px' } }}
            >
              Blog atualizado
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Video />
    </StyledSection>
  );
}
