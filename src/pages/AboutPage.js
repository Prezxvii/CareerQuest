// src/pages/AboutPage.js
import React from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For bullet points

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 4, md: 8 }, flexGrow: 1 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 600, color: theme.palette.text.primary }}>
          About CareerQuest
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your personalized guide to discovering the career path that truly fits you.
        </Typography>

        {/* Our Mission Section */}
        <Box sx={{ mb: 6, textAlign: 'left' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At CareerQuest, our mission is to empower individuals like you to make informed and confident career decisions. We believe that everyone deserves a fulfilling career, and our platform is designed to illuminate the path forward based on your unique strengths, interests, and aspirations.
          </Typography>
          <Typography variant="body1" paragraph>
            We cut through the noise of traditional job searching by providing personalized insights, helping you discover roles you're genuinely passionate about and for which you are well-suited.
          </Typography>
        </Box>

        {/* What We Offer Section */}
        <Box sx={{ mb: 6, textAlign: 'left' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
            What We Offer
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Personalized Career Matching" secondary="Get recommendations tailored to your unique profile." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Insightful Questionnaires" secondary="Our questions delve into your core preferences and skills." />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Explore Diverse Industries" secondary="Discover opportunities across various sectors." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Actionable Next Steps" secondary="Gain clarity on how to pursue your ideal career." />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>

        {/* Our Approach Section */}
        <Box sx={{ mb: 2, textAlign: 'left' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
            Our Approach
          </Typography>
          <Typography variant="body1" paragraph>
            Our method is simple yet powerful: we combine robust data analysis with user-centric design to deliver meaningful results. By understanding your aspirations and aptitudes, we bridge the gap between where you are and where you want to be professionally. We continuously refine our algorithms to provide the most accurate and up-to-date career guidance.
          </Typography>
        </Box>

      </Paper>
    </Container>
  );
};

export default AboutPage;