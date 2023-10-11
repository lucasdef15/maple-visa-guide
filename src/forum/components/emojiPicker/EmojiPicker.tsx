import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { DarkModeContext } from '../../../contexts/DarkModeContext';

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export default function EmojiPicker({ onChange }: EmojiPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { darkMode } = useContext(DarkModeContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <BsEmojiSmile />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={1}
        PaperProps={{
          sx: { borderRadius: '10px' },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker
          theme={darkMode ? 'dark' : 'light'}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </Popover>
    </>
  );
}
