import { Box, Button, Divider, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useParams } from 'react-router-dom';

interface ServerSearchProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '0px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.black, 0.15)
      : alpha(theme.palette.common.black, 0.015),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.black, 0.45)
        : alpha(theme.palette.common.black, 0.05),
  },
  margin: 0,
  width: '450px',
  display: 'flex',
  alignItems: 'center',
  paddingBlock: '.25rem',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.3rem',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '90%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    padding: 0,
  },
  '& .MuiPaper-root': {
    borderRadius: '15px',
    padding: 0,
    maxHeight: '350px',
  },
}));

export default function ServerSearch({ data }: ServerSearchProps) {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<ServerSearchProps['data']>(
    []
  );
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const filteredItems = data.map((item) => ({
      ...item,
      data: item?.data?.filter((innerItem) =>
        innerItem.name.toLowerCase().includes(query.toLowerCase())
      ),
    }));
    setFilteredData(filteredItems);
  }, [data, query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [open]);

  const onCLick = ({
    id,
    type,
  }: {
    id: string;
    type: 'channel' | 'member';
  }) => {
    setOpen(false);
    if (type === 'member') {
      navigate(`/membros/forum/servers/${params.id}/conversations/${id}`);
    }
    if (type === 'channel') {
      navigate(`/membros/forum/servers/${params.id}/channels/${id}`);
    }
  };

  return (
    <>
      <Button
        id='search-command-menu'
        aria-controls={open ? 'search-command-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClickOpen}
        sx={{
          display: 'flex',
          gap: 1,
          color: (theme) => theme.palette.text.secondary,
          textTransform: 'unset',
          borderRadius: '10px',
          '&:hover': {
            background: darkMode
              ? 'hsla(0, 0%, 100%, 0.027)'
              : 'hsla(0, 0%, 13%, 0.05)',
          },
          '& svg': {
            fontSize: '1.2rem',
          },
        }}
      >
        <FiSearch />
        <Typography
          fontSize={'1rem'}
          fontWeight={600}
          fontFamily={`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`}
        >
          Search
        </Typography>
        <Box
          component={'kbd'}
          sx={{
            pointerEvents: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '.8rem',
            gap: 0.2,
            p: '0 .2rem',
            bgcolor: darkMode ? '#121212' : '#c9c9c96e',
            borderRadius: '6px',
            ml: 'auto',
            border: darkMode ? '1px solid #111' : '1px solid lightGrey',
          }}
        >
          <small>Ctrl</small>
          <span>+</span>
          <span>K</span>
        </Box>
      </Button>
      <BootstrapDialog open={open} onClose={handleClose}>
        <Search>
          <SearchIconWrapper>
            <FiSearch />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search all channels and members'
            inputProps={{ 'aria-label': 'search' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <IconButton
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: '1.3rem',
            }}
          >
            <AiOutlineClose />
          </IconButton>
        </Search>
        <DialogContent>
          <Divider />
          {filteredData?.map(({ label, data, type }, index) => {
            if (!data?.length) return null;

            return (
              <List
                key={index}
                sx={{ width: '100%', pb: 0 }}
                component='nav'
                aria-labelledby='nested-list-subheader'
                subheader={
                  <ListSubheader
                    component='div'
                    id='nested-list-subheader'
                    sx={{
                      background: 'transparent',
                      position: 'relative',
                      pt: 1.2,
                      pb: 0.5,
                      lineHeight: 'unset',
                    }}
                  >
                    {label}
                  </ListSubheader>
                }
              >
                {data?.map(({ id, icon, name }) => {
                  return (
                    <ListItemButton
                      onClick={() => onCLick({ id, type })}
                      key={id}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 'unset',
                          pr: 1,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                    </ListItemButton>
                  );
                })}
              </List>
            );
          })}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
