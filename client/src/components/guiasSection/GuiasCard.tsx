import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

import check from '/assets/svgs/check.svg';
import scalator from '/assets/svgs/escalator.svg';

const StyledCard = styled(Stack)(({ theme }) => ({
  background: 'white',
  maxWidth: '327px',
  padding: '30px',
  borderRadius: theme.shape.borderRadius,
  boxShadow: `7px 7px 0px 0px rgba(215, 215, 255, 0.48)`,
  zIndex: -1,
}));

const CardHeader = styled('div')(({ theme }) => ({
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
  '& svg': {
    fill: theme.palette.primary.dark,
    width: '50px',
    height: '50px',
  },
}));

const CardTitle = styled('div')(() => ({
  marginBlock: '15px',
}));

const CardItem = styled(Stack)(({ theme }) => ({
  display: 'felx',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '10px',
  '& .circle': {
    width: '20px',
    height: '20px',
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '50%',
    display: 'grid',
    placeContent: 'center',
    flex: '0 0 20px',
  },
}));

const CardBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}));

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  subTitle: string;
  items: string[];
}

export default function GuiasCard({ icon, title, subTitle, items }: CardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    delay: 100,
  });

  return (
    <StyledCard>
      <CardHeader
        ref={ref}
        className={inView ? 'slideIn' : ''}
        sx={{ opacity: 0, left: '99px', position: 'relative' }}
      >
        <span className='circle'>
          {icon || <img loading='lazy' src={scalator} />}
        </span>
      </CardHeader>
      <CardTitle>
        <Typography
          fontSize='20px'
          color='text.main'
          fontWeight='bold'
          ref={ref}
          className={inView ? 'slideIn' : ''}
          sx={{ opacity: 0, left: '99px', position: 'relative' }}
        >
          {title}
        </Typography>
        <Typography
          fontSize='15px'
          color='text.secondary'
          fontWeight='bold'
          ref={ref}
          className={inView ? 'slideIn' : ''}
          sx={{ opacity: 0, left: '99px', position: 'relative' }}
        >
          {subTitle}
        </Typography>
      </CardTitle>
      <CardBody
        ref={ref}
        className={inView ? 'slideIn' : ''}
        sx={{ opacity: 0, left: '99px', position: 'relative' }}
      >
        {items.map((item, index) => (
          <CardItem key={index}>
            <span className='circle'>
              <img loading='lazy' src={check} alt='check' />
            </span>
            <p>{item}</p>
          </CardItem>
        ))}
      </CardBody>
    </StyledCard>
  );
}
