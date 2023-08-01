import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { AiFillPhone } from 'react-icons/ai';
import { IoMdMail } from 'react-icons/io';

const HeaderStripeComponent = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  textAlign: 'center',
  padding: '.7rem',
  fontWeight: 700,
  fontSize: '18px',
  '& span': {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'clamp(16px, 2vw, 18px)',
    '& svg': {
      marginRight: '10px',
    },
  },
  '@media (max-width: 700px)': {
    display: 'none',
  },
}));

export default function HeaderStripe() {
  return (
    <HeaderStripeComponent>
      <Stack
        className='spacing'
        direction='row'
        alignItems='center'
        spacing={5}
        sx={{ width: '100%' }}
      >
        <span>
          <AiFillPhone />
          +1 (416) 900-8111
        </span>
        <span>
          <IoMdMail />
          info@newintercambio.com
        </span>
      </Stack>
    </HeaderStripeComponent>
  );
}
