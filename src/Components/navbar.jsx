// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <AppBar position="static">
      
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
       CaseMate
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/admin" color="inherit">
          Admin
        </Button>
        <Button component={Link} to="/signup/client" color="inherit">
          Sign Up (Client)
        </Button>
        <Button component={Link} to="/signup/advocate" color="inherit">
          Sign Up (Advocate)
        </Button>
        <Button component={Link} to="/advocates" color="inherit">
          Explore Advocate Profiles
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
