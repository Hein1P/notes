import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Container, Typography, CssBaseline } from '@mui/material';
import Search from './components/Search';
import Notes from './components/Notes';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [search, setSearch] = React.useState('');
  let searchbgcolor;
  let searchcolor;
  if (theme.palette.mode === 'light') {
    searchbgcolor = '#000';
    searchcolor = '#fff';
  } else {
    searchbgcolor = '#fff';
    searchcolor = '#000';
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <Container sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant='h2'>Notes</Typography>
        <div>
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Box>
      <Search searchbgcolor={searchbgcolor} searchcolor={searchcolor} handleSearch={handleSearch} />
      <Notes search={search} />
    </Container>
  );
}

export default function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}