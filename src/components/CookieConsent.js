// src/components/CookieConsentBanner.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CookieConsentBanner = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has been given previously
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
    // Optionally, implement logic to disable non-essential cookies
    alert('You have declined cookies. Some features might be limited.');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 3 },
        zIndex: 1500, // Above most other content
        borderRadius: 0, // No rounded corners for a full-width banner
      }}
    >
      <Typography variant="body2" sx={{ flexGrow: 1, color: theme.palette.text.secondary }}>
        We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" color="secondary" onClick={handleDecline}>
          Decline
        </Button>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          Accept
        </Button>
      </Box>
    </Paper>
  );
};

export default CookieConsentBanner;