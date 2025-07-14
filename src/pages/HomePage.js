// src/pages/HomePage.js
import React, { useRef } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

// Import Icons for the new sections (MAKE SURE THESE ARE FROM @mui/icons-material)
import QuizIcon from '@mui/icons-material/Quiz';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'; // Correct import for the icon

import HeroIllustration from '../assets/images/hero-illustration.svg'; // Correct import for the illustration

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Refs for triggering animations when sections come into view
  const trustedRef = useRef(null);
  const trustedInView = useInView(trustedRef, { once: true, amount: 0.5 }); // Trigger when 50% of the element is in view

  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.5 });

  const whyChooseRef = useRef(null);
  const whyChooseInView = useInView(whyChooseRef, { once: true, amount: 0.5 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });


  const handleStartQuestClick = () => {
    navigate('/questionnaire');
  };

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  // Framer Motion Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const illustrationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };


  return (
    <>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          textAlign: { xs: 'center', md: 'left' },
        }}>
          <Box sx={{ flex: 1 }}>
            {/* Animate Hero Text and Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h1" component="h1" gutterBottom>
                  Discover Your Ideal <Box component="span" sx={{ color: theme.palette.primary.main }}>Career</Box> Path with CareerQuest
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ mb: { xs: 3, md: 4 }, maxWidth: '600px', mx: { xs: 'auto', md: '0' } }}>
                  Answer a few simple questions to unlock personalized career recommendations, explore job opportunities, and find your true professional calling.
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2 }}>
                <Button variant="contained" color="primary" size="large"
                  onClick={handleStartQuestClick}
                >
                  Start Your CareerQuest
                </Button>
                <Button variant="outlined" color="primary" size="large"
                  onClick={handleLearnMoreClick}
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {/* Animate Hero Illustration */}
            <motion.img
              src={HeroIllustration} // This is the line where HeroIllustration was undefined
              alt="Career path illustration"
              style={{ maxWidth: '100%', height: 'auto', maxHeight: '450px' }}
              initial="hidden"
              animate="visible"
              variants={illustrationVariants}
            />
          </Box>
        </Box>
      </Container>

      {/* "Trusted by aspiring professionals" section */}
      {/* Wrap the entire section content with motion.div and attach ref */}
      <Box ref={trustedRef} sx={{ py: { xs: 4, md: 6 }, backgroundColor: theme.palette.background.paper, boxShadow: '0px -2px 10px rgba(0,0,0,0.05)' }}>
          <Container maxWidth="md">
              <motion.div
                initial="hidden"
                animate={trustedInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                  <motion.div variants={itemVariants}>
                      <Typography variant="h6" align="center" sx={{ color: theme.palette.text.secondary, mb: { xs: 2, md: 3 } }}>
                          Trusted by aspiring professionals
                      </Typography>
                  </motion.div>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2, sm: 4 } }}>
                      {[
                          "Leading Universities",
                          "Industry Innovators",
                          "Professional Associations",
                          "Top Online Learning Platforms",
                          "Career Development Centers"
                      ].map((categoryName, i) => (
                          <motion.div key={i} variants={cardVariants}>
                              <Box sx={{
                                  width: { xs: '80px', sm: '100px' },
                                  height: { xs: '40px', sm: '50px' },
                                  borderRadius: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: theme.palette.text.secondary,
                                  fontSize: { xs: '0.55em', sm: '0.7em' },
                                  fontWeight: 'bold',
                                  p: 1,
                                  textAlign: 'center',
                                  border: `1px solid ${theme.palette.divider}`,
                                  boxShadow: theme.shadows[1],
                                  transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
                                  '&:hover': {
                                      boxShadow: theme.shadows[4],
                                      transform: 'translateY(-2px)',
                                      borderColor: theme.palette.primary.light,
                                  },
                              }}>
                                  {categoryName}
                              </Box>
                          </motion.div>
                      ))}
                  </Box>
              </motion.div>
          </Container>
      </Box>

      {/* How It Works Section */}
      <Box ref={howItWorksRef} sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
              <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: { xs: 4, md: 6 }, fontWeight: 600 }}>
                  How CareerQuest Works
                </Typography>
              </motion.div>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <motion.div variants={cardVariants}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 80, height: 80, mx: 'auto', mb: 2 }}>
                        <QuizIcon sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>1. Answer Questions</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Complete our quick, insightful questionnaire about your interests, skills, and goals.
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div variants={cardVariants}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 80, height: 80, mx: 'auto', mb: 2 }}>
                        <AutoFixHighIcon sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>2. Get Personalized Matches</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Our intelligent algorithm matches your profile to suitable career paths.
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div variants={cardVariants}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 80, height: 80, mx: 'auto', mb: 2 }}>
                        <RocketLaunchIcon sx={{ fontSize: 40, color: theme.palette.primary.contrastText }} />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>3. Launch Your Future</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Explore detailed career insights and take the next step with confidence.
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Why Choose CareerQuest Section (Benefits) */}
      <Box ref={whyChooseRef} sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
              <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: { xs: 4, md: 6 }, fontWeight: 600 }}>
                  Why Choose CareerQuest?
                </Typography>
              </motion.div>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div variants={cardVariants}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, textAlign: 'center', boxShadow: theme.shadows[3] }}>
                      <CardContent>
                        <LightbulbOutlinedIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Personalized Insights</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive recommendations uniquely tailored to your personality, skills, and aspirations.
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div variants={cardVariants}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, textAlign: 'center', boxShadow: theme.shadows[3] }}>
                      <CardContent>
                        <ExploreOutlinedIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Explore Diverse Paths</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Uncover a wide range of career opportunities you might not have considered.
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <motion.div variants={cardVariants}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, textAlign: 'center', boxShadow: theme.shadows[3] }}>
                      <CardContent>
                        <TrendingUpOutlinedIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                        <Typography variant="h6" gutterBottom>Actionable Guidance</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Get clear next steps and valuable information for your chosen path.
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Final Call to Action Section */}
      <Box ref={ctaRef} sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, textAlign: 'center' }}>
        <Container maxWidth="md">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: { xs: 3, md: 4 }, fontWeight: 600 }}>
                  Ready to Find Your Dream Career?
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleStartQuestClick}
                  sx={{ px: 4, py: 1.5, borderRadius: 100 }}
                >
                  Start Your CareerQuest Now!
                </Button>
              </motion.div>
            </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;