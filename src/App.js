// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Your custom theme

// Import your Navbar component
import Navbar from './components/Navbar';

// Import your Footer component
import Footer from './components/Footer'; // NEW: Import Footer

// Import your pages
import HomePage from './pages/HomePage';
import QuestionnairePage from './pages/QuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Render Navbar here so it appears on all pages */}
        <Navbar />

        {/* Define your routes directly. The content of the pages will go here. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="questionnaire" element={<QuestionnairePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="about" element={<AboutPage />} />
          {/* You might want routes for Privacy Policy and Terms of Service too */}
          {/* <Route path="privacy" element={<PrivacyPolicyPage />} /> */}
          {/* <Route path="terms" element={<TermsOfServicePage />} /> */}
        </Routes>

        {/* Render Footer here so it appears on all pages after the main content */}
        <Footer /> {/* NEW: Render Footer */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
