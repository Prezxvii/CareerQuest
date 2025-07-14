// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Your custom theme

// Import your main components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Make sure this path is correct if your Footer.js is in src/components directly
import CookieConsent from './components/CookieConsent';
import ChatWidget from './components/ChatWidget';

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

        {/* Define your routes. The content of the pages will go here. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="questionnaire" element={<QuestionnairePage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="about" element={<AboutPage />} />
          {/* Add more routes here if needed */}
        </Routes>

        {/* Render Footer here so it appears on all pages after the main content */}
        <Footer />

        {/* Render CookieConsent. It will be fixed at the bottom. */}
        <CookieConsent />

        {/* Render ChatWidget. It will also be fixed on top of content. */}
        <ChatWidget />
      </Router>
    </ThemeProvider>
  );
}

export default App;