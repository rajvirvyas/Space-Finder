'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import Login from './Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from './Signup';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import { signOut } from "next-auth/react"
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
      light: blueGrey[200],
      dark: '#1565c0',
      contrastText: blueGrey[100],
    }
  }
});

export default function RootLayout({ children, title }) {

  const { data: session, status }  = useSession();

  let loginSection;

  if (status === 'authenticated') {
    loginSection = <>
    <Button variant="outlined" color="inherit" href='/profile'>Profile</Button>
    <Button variant="outlined" color="inherit" onClick={() => signOut({ callbackUrl: '/'})}>Sign Out</Button>
    </>;
  } else {
    loginSection = <>
      <Login/>
      <Signup/>
    </>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', boxShadow: 1 }}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <SavedSearchIcon fontSize='large'/>  
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Arial',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {title}
              </Typography>
              <NavBar />
              <Box sx={{ flexGrow: 0 }}>
                <Stack direction='row' spacing={2}>
                  <Button color='inherit'>Contact Us</Button>
                  {loginSection}
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}