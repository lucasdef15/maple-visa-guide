import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface MobileToggleProps {
  open?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MobileToggle({ open, handleClick }: MobileToggleProps) {
  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={handleClick}
        edge='start'
        sx={{
          mr: 2,
          ...(open && { display: 'none' }),
          display: { xs: '', sm: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
