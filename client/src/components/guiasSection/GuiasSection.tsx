import { styled } from '@mui/material/styles';
import GuiasCard from './GuiasCard';

const Spikes = styled('section')(() => ({
  position: 'relative',
  backgroundColor: '#21D4FD',
  backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
  marginBlock: '100px',
  height: '80vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '&::before, &::after': {
    '--spike-width': '50px',
    '--spike-height': '10px',
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '50px',
    background: '#f7f7f7',
    maskSize: 'var(--spike-width) var(--spike-height)',
    maskRepeat: 'repeat-X',
  },
  '&::after': {
    top: 0,
    maskImage: 'url("/assets/svgs/triangle.svg")',
  },
  '&::before': {
    bottom: '-40px',
    maskImage: 'url("/assets/svgs/triangleUpwords.svg")',
  },
}));

export default function GuiasSection() {
  return (
    <Spikes>
      <GuiasCard />
    </Spikes>
  );
}
