import { Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import OptionsMenu from '../../../menu/OptionsMenu';
import { useContext } from 'react';
import PostsContext from '../../../../contexts/PostsContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: theme.palette.common.white,
  boxShadow: '1px 1px 10px rgba(0, 0, 0, .1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '375px',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '300px',
    [theme.breakpoints.down('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HeaderSearchBar() {
  const { query, setQuery } = useContext(PostsContext);

  return (
    <Stack
      sx={{
        width: '100%',
        padding: '0 2rem',
        height: '45%',
      }}
      alignItems={'center'}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          marginTop: '2rem',
          width: '100%',
          maxWidth: '1700px',
        }}
      >
        <OptionsMenu />
        <Stack>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Stack>
      </Stack>
    </Stack>
  );
}
