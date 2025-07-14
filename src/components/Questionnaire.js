// src/components/Questionnaire.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
  Paper,
  Slider,
  Checkbox,
  FormGroup,
  TextField,
  Chip, // Keep Chip for selected skills display
  // Fab, // Not needed with new Q6 type
  // InputAdornment, // Not needed with new Q6 type
  // IconButton, // Not needed with new Q6 type
  Grid, // NEW: Needed for displaying skill suggestions in a grid
  Card, // NEW: Needed for displaying skill suggestions as cards
  CardContent // NEW: Needed for displaying skill suggestions card content
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// Add these if you use them elsewhere, but not for the new Q6
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { motion } from 'framer-motion'; // NEW: For animation on skill cards

// MOVE THE 'questions' ARRAY DEFINITION HERE, OUTSIDE THE COMPONENT FUNCTION
// This array structure defines ALL questions. Q6 type will be changed.
const questions = [
  {
    id: 'q1',
    text: 'What is your primary career goal?',
    type: 'radio',
    options: [
      { value: 'growth', label: 'Career Growth & Advancement', tags: ['ambitious', 'leader', 'strategist'] },
      { value: 'impact', label: 'Making a Positive Impact on Society', tags: ['humanitarian', 'innovator', 'community-focused'] },
      { value: 'stability', label: 'Job Security & Stability', tags: ['dependable', 'structured', 'planner'] },
      { value: 'flexibility', label: 'Work-Life Balance & Flexibility', tags: ['adaptable', 'independent', 'resourceful'] },
      { value: 'income', label: 'High Income & Financial Reward', tags: ['driven', 'results-oriented', 'competitive'] },
    ],
  },
  {
    id: 'q2',
    text: 'How do you prefer to work?',
    type: 'radio',
    options: [
      { value: 'team', label: 'Collaboratively in a Team', tags: ['team-player', 'communicative', 'supportive'] },
      { value: 'independent', label: 'Independently with Autonomy', tags: ['self-starter', 'disciplined', 'focused'] },
      { value: 'client-facing', label: 'Client-Facing / Interacting with People', tags: ['extroverted', 'empathetic', 'persuasive'] },
      { value: 'data', label: 'With Data and Analytics', tags: ['analytical', 'logical', 'detail-oriented'] },
      { value: 'creative', label: 'Creatively / Hands-on', tags: ['innovative', 'designer', 'artistic'] },
    ],
  },
  {
    id: 'q3',
    text: 'On a scale of 1-10, how important is innovation in your ideal role?',
    type: 'slider',
    min: 1,
    max: 10,
    defaultValue: 5,
    tags: {
      1: ['traditional', 'stable'],
      5: ['adaptable', 'open-minded'],
      10: ['innovator', 'visionary', 'disruptor'],
    },
  },
  {
    id: 'q4',
    text: 'Which of these work environments do you thrive in? (Select all that apply)',
    type: 'checkbox',
    options: [
      { value: 'fast-paced', label: 'Fast-paced & Dynamic', tags: ['agile', 'resilient', 'quick-thinker'] },
      { value: 'structured', label: 'Structured & Organized', tags: ['meticulous', 'systematic', 'planner'] },
      { value: 'remote', label: 'Remote / Flexible Location', tags: ['independent', 'disciplined'] },
      { value: 'office', label: 'Traditional Office Setting', tags: ['collaborative', 'social'] },
      { value: 'travel', label: 'Involves Frequent Travel', tags: ['adventurous', 'flexible'] },
    ],
  },
  {
    id: 'q5',
    text: 'What kind of challenges energize you the most?',
    type: 'radio',
    options: [
      { value: 'complex-problem', label: 'Solving Complex Problems', tags: ['problem-solver', 'critical-thinker', 'analytical'] },
      { value: 'people-relations', label: 'Managing People & Relations', tags: ['leader', 'empathetic', 'mediator'] },
      { value: 'new-tech', label: 'Mastering New Technologies', tags: ['tech-savvy', 'learner', 'innovator'] },
      { value: 'routine-tasks', label: 'Efficiently Completing Routine Tasks', tags: ['organized', 'efficient', 'reliable'] },
      { value: 'creative-project', label: 'Executing Creative Projects', tags: ['creative', 'visionary', 'producer'] },
    ],
  },
  {
    id: 'q6',
    text: 'What skills do you possess or wish to develop? (Select up to 5)', // Updated text
    type: 'skills_suggestions', // NEW TYPE for Question 6
    maxSelections: 5, // Max number of skills to select
  },
];

// Define the suggestions specifically for Question 6 (skills)
// This array is used ONLY when currentQuestion.type is 'skills_suggestions'
const skillSuggestions = [
  "Problem Solving", "Communication", "Leadership", "Teamwork",
  "Critical Thinking", "Creativity", "Data Analysis", "Project Management",
  "Digital Marketing", "Software Development", "UX/UI Design", "Financial Acumen"
];


const Questionnaire = ({ onComplete }) => {
  const theme = useTheme();
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Remove keywordInput and keywords states as they are no longer used for Q6
  // const [keywordInput, setKeywordInput] = useState('');
  // const [keywords, setKeywords] = useState([]);

  // NEW: State to manage selected skills for Question 6
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [collectedTags, setCollectedTags] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  // This handles changes for Radio and Checkbox type questions (Q1, Q2, Q4, Q5)
  const handleAnswerChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setAnswers((prev) => {
        const currentChecks = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...currentChecks, value]
            : currentChecks.filter((item) => item !== value),
        };
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // This handles changes for Slider type question (Q3)
  const handleSliderChange = (event, newValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: newValue,
    }));
  };

  // NEW: Handler for clicking on skill suggestion cards (ONLY for Question 6)
  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill)); // Deselect if already selected
    } else if (selectedSkills.length < currentQuestion.maxSelections) { // Limit to maxSelections (5)
      setSelectedSkills([...selectedSkills, skill]); // Select if limit not reached
    }
  };

  const handleNext = () => {
    let newTags = [];

    // Tag collection logic based on question type
    if (currentQuestion.type === 'radio') {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.value === answers[currentQuestion.id]
      );
      if (selectedOption && selectedOption.tags) {
        newTags = selectedOption.tags;
      }
    } else if (currentQuestion.type === 'checkbox') {
      const selectedOptions = currentQuestion.options.filter((opt) =>
        answers[currentQuestion.id]?.includes(opt.value)
      );
      newTags = selectedOptions.flatMap((opt) => opt.tags || []);
    } else if (currentQuestion.type === 'slider') {
      const sliderValue = answers[currentQuestion.id];
      if (currentQuestion.tags) {
        const relevantTags = currentQuestion.tags[sliderValue];
        if (relevantTags) {
          newTags = relevantTags;
        }
      }
    } else if (currentQuestion.type === 'skills_suggestions') { // NEW: Handle tags for Q6
      newTags = selectedSkills; // Selected skills are directly the tags
    }
    // No 'keywords' type anymore for Q6 here, so the old logic is removed.

    const updatedCollectedTags = [...new Set([...collectedTags, ...newTags])];
    setCollectedTags(updatedCollectedTags);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset selectedSkills when moving to a new question if it was Q6
      if (currentQuestion.type === 'skills_suggestions') {
        setSelectedSkills([]);
      }
      // Old keywordInput/keywords reset logic removed here
    } else {
      // End of questionnaire
      if (onComplete) {
        onComplete(updatedCollectedTags);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // When going back TO Q6 (index 5), re-populate selectedSkills from previous state if needed
      if (questions[currentQuestionIndex - 1].type === 'skills_suggestions') {
        // This is tricky. If you want to remember previous Q6 selection on 'Back',
        // you'd need to store selectedSkills in 'answers' like other questions.
        // For simplicity now, going back to Q6 will reset its selections.
        setSelectedSkills([]); // Resets selections on back, can be changed if state needs to persist.
      }
    }
  };

  // This function renders the appropriate input UI for each question type.
  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'radio': // This handles Q1, Q2, Q5 - NO CHANGE
        return (
          <FormControl component="fieldset">
            <RadioGroup
              name={currentQuestion.id}
              value={answers[currentQuestion.id] || ''}
              onChange={handleAnswerChange}
            >
              {currentQuestion.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'slider': // This handles Q3 - NO CHANGE
        return (
          <Box sx={{ width: '80%', mx: 'auto', mt: 3 }}>
            <Slider
              name={currentQuestion.id}
              value={answers[currentQuestion.id] || currentQuestion.defaultValue}
              onChange={handleSliderChange}
              aria-labelledby="slider-question"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={currentQuestion.min}
              max={currentQuestion.max}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">Not Important</Typography>
              <Typography variant="body2" color="text.secondary">Very Important</Typography>
            </Box>
          </Box>
        );
      case 'checkbox': // This handles Q4 - NO CHANGE
        return (
          <FormGroup>
            {currentQuestion.options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id]?.includes(option.value) || false}
                    onChange={handleAnswerChange}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        );
      case 'skills_suggestions': // THIS IS THE NEW LOGIC FOR QUESTION 6 ONLY
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              Click to select skills you possess or want to develop (max {currentQuestion.maxSelections}):
            </Typography>
            <Box sx={{ mb: 3, minHeight: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {selectedSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillSelect(skill)} // Allows deselecting by clicking 'X' on chip
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 0, mb: 0 }} // Adjusted margins for Chip display
                />
              ))}
            </Box>
            <Grid container spacing={2} justifyContent="center">
              {skillSuggestions.map((skill, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      variant="outlined"
                      onClick={() => handleSkillSelect(skill)}
                      sx={{
                        cursor: 'pointer',
                        borderColor: selectedSkills.includes(skill) ? theme.palette.primary.main : theme.palette.divider,
                        borderWidth: selectedSkills.includes(skill) ? '2px' : '1px',
                        backgroundColor: selectedSkills.includes(skill) ? theme.palette.primary.light + '1A' : theme.palette.background.paper,
                        textAlign: 'center',
                        p: { xs: 1, sm: 2 },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: selectedSkills.includes(skill) ? theme.shadows[3] : theme.shadows[1],
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                        <Typography variant="body2" fontWeight="medium" sx={{ color: selectedSkills.includes(skill) ? theme.palette.primary.dark : theme.palette.text.primary }}>
                          {skill}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      // The original 'keywords' case is REMOVED as Q6 is now 'skills_suggestions'
      // No other question types are impacted.
      default:
        return <Typography>Question type not supported.</Typography>;
    }
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, maxWidth: 800, mx: 'auto', mt: 4, mb: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600, color: theme.palette.text.primary }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
        {currentQuestion.text}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {renderQuestion()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          // Disable "Finish" button if it's Question 6 AND no skills are selected
          disabled={currentQuestionIndex === questions.length - 1 && selectedSkills.length === 0}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>

      {/* For debugging: Display collected tags */}
      {/* <Box sx={{ mt: 4, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Collected Tags: {collectedTags.join(', ')}
        </Typography>
      </Box> */}
    </Paper>
  );
};

export default Questionnaire;