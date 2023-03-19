import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['רשתות חברתיות'];


const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate()


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  let img_url = '/imgs2/logo.webp'
  return (
    <AppBar position="static" style={{ background: '#1C6758' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className='navbar-logo' aria-label='website-logo' src={img_url} onClick={() =>{navigate('/')}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
              sx={{
              mr: 2,
              display: { xs: 'flex', cursor: 'pointer', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Afoona
          </Typography>
 
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href='https://www.facebook.com/afoona.recipes/'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
