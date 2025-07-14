// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9800', // A warm, inviting orange/amber
      light: '#FFB74D',
      dark: '#FB8C00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#424242', // A dark grey for contrast
      light: '#6D6D6D',
      dark: '#212121',
      contrastText: '#fff',
    },
    error: {
      main: '#EF5350',
    },
    warning: {
      main: '#FFC107',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
    background: {
      default: '#f4f6f8', // Light grey background for the overall app
      paper: '#ffffff', // White for cards and elevated surfaces
    },
    text: {
      primary: '#212121', // Dark text for main content
      secondary: '#757575', // Lighter text for secondary information
      disabled: '#BDBDBD',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '3.5rem', // Larger for hero section
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // Keep button text as-is, not all caps
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded corners for buttons
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            // Optional: Add custom styles for contained primary buttons
            // boxShadow: '0 4px 10px rgba(255, 152, 0, 0.3)',
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // White app bar
          color: '#212121', // Dark text for app bar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Consistent shadow for cards/papers
          borderRadius: 8, // Consistent border radius for cards/papers
        },
      },
    },
  },
});

export default theme;