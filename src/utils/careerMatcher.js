// src/utils/careerMatcher.js

// Define example career profiles with associated tags and NOW salary ranges
export const careerProfiles = [
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    description: 'Designs, develops, and maintains software applications.',
    tags: ['analytical', 'problem-solver', 'tech-savvy', 'innovator', 'team-player', 'structured', 'logical', 'detail-oriented', 'growth'],
    salaryRange: '$70,000 - $150,000+', // Added salary range
  },
  {
    id: 'marketing_manager',
    title: 'Marketing Manager',
    description: 'Plans and executes marketing campaigns to promote products or services.',
    tags: ['creative', 'communicative', 'persuasive', 'strategist', 'team-player', 'client-facing', 'results-oriented', 'extroverted', 'impact'],
    salaryRange: '$60,000 - $120,000', // Added salary range
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    description: 'Analyzes complex data sets to extract insights and inform business decisions.',
    tags: ['analytical', 'logical', 'detail-oriented', 'problem-solver', 'innovator', 'structured', 'tech-savvy', 'focused', 'researcher', 'impact', 'growth'],
    salaryRange: '$80,000 - $160,000+', // Added salary range
  },
  {
    id: 'graphic_designer',
    title: 'Graphic Designer',
    description: 'Creates visual concepts using computer software or by hand, to communicate ideas.',
    tags: ['creative', 'artistic', 'innovator', 'independent', 'detail-oriented', 'visualizer', 'communicative', 'flexible'],
    salaryRange: '$45,000 - $85,000', // Added salary range
  },
  {
    id: 'human_resources_specialist',
    title: 'Human Resources Specialist',
    description: 'Manages an organization\'s human resources by administering benefits, payroll, and recruiting.',
    tags: ['empathetic', 'communicative', 'supportive', 'team-player', 'organized', 'dependable', 'structured', 'social', 'people-relations', 'stability'],
    salaryRange: '$50,000 - $90,000', // Added salary range
  },
  {
    id: 'project_manager',
    title: 'Project Manager',
    description: 'Plans, executes, and closes projects—for example, a software rollout or a marketing campaign.',
    tags: ['leader', 'planner', 'organized', 'strategist', 'communicative', 'results-oriented', 'team-player', 'problem-solver', 'structured', 'disciplined'],
    salaryRange: '$75,000 - $130,000', // Added salary range
  },
  {
    id: 'customer_support_representative',
    title: 'Customer Support Representative',
    description: 'Assists customers with product or service issues, providing solutions and maintaining satisfaction.',
    tags: ['communicative', 'supportive', 'empathetic', 'problem-solver', 'dependable', 'patient', 'social', 'client-facing', 'stability'],
    salaryRange: '$35,000 - $60,000', // Added salary range
  },
  {
    id: 'research_scientist',
    title: 'Research Scientist',
    description: 'Conducts experiments and analyses to advance scientific knowledge or develop new products.',
    tags: ['analytical', 'innovator', 'focused', 'detail-oriented', 'problem-solver', 'independent', 'disciplined', 'curious', 'growth'],
    salaryRange: '$70,000 - $140,000', // Added salary range
  },
  {
    id: 'sales_representative',
    title: 'Sales Representative',
    description: 'Sells products or services to customers and builds relationships with clients.',
    tags: ['persuasive', 'extroverted', 'communicative', 'results-oriented', 'competitive', 'driven', 'client-facing', 'travel', 'independent'],
    salaryRange: '$40,000 - $90,000+', // Added salary range (often with commission)
  },
  {
    id: 'financial_analyst',
    title: 'Financial Analyst',
    description: 'Provides guidance to businesses and individuals making investment decisions.',
    tags: ['analytical', 'detail-oriented', 'logical', 'structured', 'disciplined', 'problem-solver', 'focused', 'results-oriented', 'growth'],
    salaryRange: '$65,000 - $110,000', // Added salary range
  },
];

// Function to match user tags to career profiles (remains the same)
export const getMatchingCareers = (userTags, numResults = 3) => {
  if (!userTags || userTags.length === 0) {
    return []; // Return empty array if no user tags
  }

  const matches = careerProfiles.map(profile => {
    let score = 0;
    const matchedTags = [];

    userTags.forEach(userTag => {
      // Case-insensitive comparison
      if (profile.tags.some(profileTag => profileTag.toLowerCase() === userTag.toLowerCase())) {
        score++;
        matchedTags.push(userTag);
      }
    });

    return {
      profile,
      score,
      matchedTags,
    };
  });

  // Sort by score in descending order
  matches.sort((a, b) => b.score - a.score);

  // Filter out profiles with no matches and return top N results
  return matches
    .filter(match => match.score > 0)
    .slice(0, numResults)
    .map(match => ({
      ...match.profile, // Spread the profile details (now includes salaryRange)
      score: match.score, // Add the score
      matchedTags: match.matchedTags, // Add the matched tags for display
    }));
};