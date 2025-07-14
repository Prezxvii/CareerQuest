// src/components/Footer.js
import React from 'react';
import { Box, Typography, Container, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 3, md: 6 },
        mt: 'auto', // Pushes footer to the bottom
        backgroundColor: theme.palette.primary.dark, // Use dark primary color for footer background
        color: theme.palette.primary.contrastText, // White text for contrast
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} CareerQuest. All rights reserved.
        </Typography>
        <Typography variant="body2">
          <MuiLink component={RouterLink} to="/privacy" color="inherit" sx={{ mr: 1, textDecoration: 'none' }}>
            Privacy Policy
          </MuiLink>
          |
          <MuiLink component={RouterLink} to="/terms" color="inherit" sx={{ ml: 1, textDecoration: 'none' }}>
            Terms of Service
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;