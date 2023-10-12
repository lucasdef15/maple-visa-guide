import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionTooltip from '../../../../forum/components/actionTooltip/ActionTooltip';

interface DrawerListItemProps {
  text: string;
  open: boolean;
  icon: React.ReactNode;
  to: string;
}

export default function DrawerListItem({
  open,
  icon,
  text,
  to,
}: DrawerListItemProps) {
  const navigate = useNavigate();
  return (
    <ActionTooltip title={open ? '' : text} placement='right'>
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          transition: 'background 150ms',
          '&:hover': {
            background: '#23262D',
          },
        }}
      >
        <ListItemButton
          onClick={() => navigate(to)}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: 'inherit',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </ActionTooltip>
  );
}
