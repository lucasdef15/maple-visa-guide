import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { AiOutlinePlus } from 'react-icons/ai';
import ActionTooltip from '../actionTooltip/ActionTooltip';
import { useModal } from '../../hooks/use-modal-store';

export default function NavigationAction() {
  const { onOpen } = useModal();
  return (
    <Stack>
      <ActionTooltip title={'Add A Server'} placement='right'>
        <IconButton
          onClick={() => onOpen('createServer')}
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark' ? '#444' : '#fff',
            color: 'rgb(16 185 129)',
            transition: 'all 250ms',
            height: '48px',
            width: '48px',
            '&:hover': {
              backgroundColor: 'rgb(16 185 129)',
              color: 'white',
              borderRadius: '16px',
            },
          }}
        >
          <AiOutlinePlus />
        </IconButton>
      </ActionTooltip>
    </Stack>
  );
}
