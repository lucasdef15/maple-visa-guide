import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { SocketContext } from '../../../contexts/SocketProvider';

export default function SocketIndicator() {
  const { isConnected } = useContext(SocketContext);

  if (!isConnected) {
    return (
      <Chip
        label='Fallback: Polling every 1s'
        sx={{ background: 'rgb(202 138 4)', color: '#fff' }}
      />
    );
  }

  return (
    <Chip
      label='Live: Real-time updates'
      sx={{ background: 'rgb(5 150 105)', color: '#fff' }}
    />
  );
}
