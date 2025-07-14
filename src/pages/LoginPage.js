// src/pages/LoginPage.js
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link as MuiLink
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (event) => {
    event.preventDefault();
    console.log('Email:', email, 'Password:', password);
    alert('Email/Password Login functionality is a placeholder.');
  };

  const handleGoogleLogin = () => {
    console.log('Attempting Google Login...');
    alert('Google Login functionality is a placeholder. Requires API setup.');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 }, flexGrow: 1 }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Welcome Back!
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, py: 1.5, backgroundColor: '#4285F4', '&:hover': { backgroundColor: '#357ae8' } }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          Log in with your Email
        </Typography>

        <Box component="form" onSubmit={handleEmailLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5 }}
          >
            Log In
          </Button>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <MuiLink href="#" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
            Forgot password?
          </MuiLink>
          <MuiLink href="#" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
            {"Don't have an account? Sign Up"}
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;