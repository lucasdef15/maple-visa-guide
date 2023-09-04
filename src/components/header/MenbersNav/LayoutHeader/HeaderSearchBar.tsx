import { Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import OptionsMenu from '../../../menu/OptionsMenu';
import { useContext } from 'react';
import PostsContext from '../../../../contexts/PostsContext';
import DispLayMenu from '../menu/DisplayMenu';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '10px',
  boxShadow: '1px 1px 10px rgba(0, 0, 0, .1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.down('sm')]: {
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
    },
  },
}));

export default function HeaderSearchBar() {
  const { query, setQuery } = useContext(PostsContext);

  const { darkMode } = useContext(DarkModeContext);

  return (
    <Stack
      sx={{
        width: '100%',
        padding: { xs: '0 1rem', sm: '0 2rem' },
        paddingRight: { xs: '1rem', sm: '2.6rem' },
        height: '45%',
        marginBlock: { xs: '120px', sm: '0' },
      }}
      alignItems={'center'}
    >
      <Stack
        direction={{ xs: 'column-reverse', lg: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        useFlexGap
        spacing={2}
        sx={{
          marginTop: '2rem',
          width: '100%',
          maxWidth: '1700px',
          // maxHeight: '50px',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          useFlexGap
          alignItems={{ xs: '', sm: 'start' }}
          spacing={{ sx: '0px', sm: 3 }}
          sx={{ maxHeight: '100px' }}
        >
          <DispLayMenu />
          <OptionsMenu />
        </Stack>
        <Stack>
          <Search
            sx={{
              backgroundColor: darkMode ? '#242424' : '#fff',
              color: darkMode ? '#fff' : '',
            }}
          >
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
