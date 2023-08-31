import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';

export default function Loader() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        height: 'calc(100vh - 130px)',
        placeContent: 'center',
        color: darkMode ? 'white' : '#000088',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  );
}
