// src/components/Navbar.js (Example - adjust to your actual Navbar structure)
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: 0, py: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            CareerQuest
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" component={Link} to="/questionnaire">
            Start Quest
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About Us
          </Button>
          {/* NEW: Login Button */}
          <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
            Login / Sign Up
          </Button>
        </Box>
        {/* You might have a mobile menu here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;