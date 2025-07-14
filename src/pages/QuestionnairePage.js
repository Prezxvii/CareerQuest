// src/pages/QuestionnairePage.js
import React, { useState } from 'react'; // Import useState
import { Box, Container, Typography } from '@mui/material';
import Questionnaire from '../components/Questionnaire';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const QuestionnairePage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  // State to hold the final tags from the questionnaire
  const [finalCollectedTags, setFinalCollectedTags] = useState([]);

  // Callback function to receive tags when questionnaire is complete
  const handleQuestionnaireComplete = (tags) => {
    setFinalCollectedTags(tags);
    console.log("Questionnaire completed with tags:", tags);

    // Navigate to results page, passing tags as state
    navigate('/results', { state: { userTags: tags } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 } }}>
      <Box sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.components.MuiPaper.styleOverrides.root.boxShadow,
        p: { xs: 3, sm: 4 },
        textAlign: 'center'
      }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600, color: theme.palette.text.primary }}>
          Start Your CareerQuest
        </Typography>
        {/* Pass the callback function to the Questionnaire component */}
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </Box>
    </Container>
  );
};

export default QuestionnairePage;