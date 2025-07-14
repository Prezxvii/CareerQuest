// src/pages/ResultsPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getMatchingCareers } from '../utils/careerMatcher';

const ResultsPage = () => {
  const theme = useTheme();
  const location = useLocation();
  const [recommendedCareers, setRecommendedCareers] = useState([]);
  const userTags = location.state?.userTags || [];

  useEffect(() => {
    if (userTags.length > 0) {
      const matches = getMatchingCareers(userTags);
      setRecommendedCareers(matches);
    } else {
      setRecommendedCareers([]);
    }
  }, [userTags]);

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 }, flexGrow: 1 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
          Your Top Career Recommendations
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Based on your answers, here are some career paths that align with your profile:
        </Typography>

        {userTags.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Tags:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {userTags.map((tag, index) => (
                <Chip key={index} label={tag} color="primary" variant="outlined" size="small" />
              ))}
            </Box>
          </Box>
        )}


        {recommendedCareers.length > 0 ? (
          <Box>
            {recommendedCareers.map((career) => (
              <Paper key={career.id} sx={{ p: { xs: 2, sm: 3 }, mb: 3, textAlign: 'left', backgroundColor: theme.palette.background.default }}>
                <Typography variant="h5" component="h3" sx={{ color: theme.palette.primary.main, mb: 1, fontWeight: 600 }}>
                  {career.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}> {/* Adjusted mb for new line */}
                  {career.description}
                </Typography>
                {/* Display the Salary Range */}
                {career.salaryRange && (
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Salary Range: {career.salaryRange}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Match Score: {career.score} tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {career.matchedTags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }} />
                  ))}
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                  (Matched tags shown)
                </Typography>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No specific career recommendations based on your input. Try adjusting your answers!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ResultsPage;