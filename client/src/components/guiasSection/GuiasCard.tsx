import { Stack, Typography } from '@mui/material';
import scalator from '/assets/svgs/escalator.svg';
import { styled } from '@mui/material/styles';
import check from '/assets/svgs/check.svg';

const StyledCard = styled(Stack)(({ theme }) => ({
  background: 'white',
  maxWidth: '327px',
  padding: '30px',
  borderRadius: theme.shape.borderRadius,
}));

const CardHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .circle': {
    width: '90px',
    height: '90px',
    backgroundColor: '#1c6ef12f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
  '& img': {
    width: '54px',
    height: '50px',
  },
}));

const CardTitle = styled('div')(() => ({
  marginBlock: '15px',
}));

const CardItem = styled(Stack)(({ theme }) => ({
  display: 'felx',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  '& .circle': {
    width: '20px',
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'grid',
    placeContent: 'center',
  },
}));

export default function GuiasCard() {
  return (
    <StyledCard>
      <CardHeader>
        <span className='circle'>
          <img src={scalator} alt='icon' />
        </span>
      </CardHeader>
      <CardTitle>
        <Typography fontSize='20px' color='primary' fontWeight='bold'>
          PASSO A PASSO
        </Typography>
        <Typography fontSize='15px' color='text.secondary' fontWeight='bold'>
          Um Passo a Passo para o Sucesso
        </Typography>
      </CardTitle>
      <div className='body'>
        <CardItem>
          <span className='circle'>
            <img src={check} alt='check' />
          </span>
          <p>Lorem ipsum dolor sit amet.</p>
        </CardItem>
      </div>
    </StyledCard>
  );
}
