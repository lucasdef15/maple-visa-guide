import { Stack } from '@mui/system';
import { styled } from '@mui/material/styles';
import blog from '/assets/svgs/blog.svg';
import experiencia from '/assets/svgs/experiencia.svg';
import valiosa from '/assets/svgs/valiosa.svg';
import Button from './Button';
import Video from './Video';

const StyledSection = styled('div')(({ theme }) => ({
  marginBlock: '220px',
  counterReset: 'my-counter',

  '& h2': {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  '& p': {
    fontSize: '18px',
    color: theme.palette.primary.main,
  },
}));

const StyledCard = styled('div')(({ theme }) => ({
  backgroundColor: '#00009926',
  borderRadius: theme.shape.borderRadius,
  width: '155px',
  height: '150px',
  position: 'relative',
  display: 'grid',
  placeContent: 'center',

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
  },
  '& img': {
    width: '50px',
    height: '50px',
  },
}));

const ButtonWrapper = styled('div')(() => ({
  marginBlock: '25px',
}));

export default function VideoSection() {
  return (
    <StyledSection className='spacing'>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Stack justifyContent='space-between'>
          <h2>Apoio em Cada Etapa!</h2>
          <p>Estamos aqui para ajudar você em cada etapa do proceso</p>
          <ButtonWrapper>
            <Button text='Ver Mais' />
          </ButtonWrapper>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Stack alignItems='center'>
            <StyledCard>
              <img src={experiencia} alt='experiencia' />
            </StyledCard>
            <p style={{ marginTop: '10px' }}>Experiência única</p>
          </Stack>
          <Stack alignItems='center'>
            <StyledCard>
              <img src={valiosa} alt='valiosa' />
            </StyledCard>
            <p style={{ marginTop: '10px' }}>Dicas valiosas</p>
          </Stack>
          <Stack alignItems='center'>
            <StyledCard>
              <img src={blog} alt='blog' />
            </StyledCard>
            <p style={{ marginTop: '10px' }}>Blog atualizado</p>
          </Stack>
        </Stack>
      </Stack>
      <Video />
    </StyledSection>
  );
}
