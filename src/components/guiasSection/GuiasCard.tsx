import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import { AiFillCheckCircle } from 'react-icons/ai';
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
  textAlign: 'center',
}));

const CardItem = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '10px',
  '& svg': {
    width: '17px',
    height: '17px',
    flex: '0 0 17px',
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
          className={inView ? 'slideIn' : ''}
          sx={{ opacity: 0, left: '99px', position: 'relative' }}
        >
          {title}
        </Typography>
        <Typography
          fontSize='15px'
          color='text.secondary'
          fontWeight='bold'
          className={inView ? 'slideIn' : ''}
          sx={{ opacity: 0, left: '99px', position: 'relative' }}
        >
          {subTitle}
        </Typography>
      </CardTitle>
      <CardBody
        className={inView ? 'slideIn' : ''}
        sx={{ opacity: 0, left: '99px', position: 'relative' }}
      >
        {items.map((item, index) => (
          <CardItem key={index}>
            <AiFillCheckCircle />
            <span>{item}</span>
          </CardItem>
        ))}
      </CardBody>
    </StyledCard>
  );
}
