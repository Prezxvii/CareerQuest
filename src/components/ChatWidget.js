// src/components/ChatWidget.js
import React, { useState, useRef, useEffect } from 'react';
import { Box, Fab, Tooltip, Paper, TextField, IconButton, Typography, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

const ChatWidget = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to CareerQuest. How can I help you today? Try asking about "careers", "questionnaire", or "support".' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling to the bottom of messages

  // Scroll to the latest message whenever messages state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { sender: 'user', text: inputMessage.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage(''); // Clear input immediately

    // Get bot response after a short delay to simulate typing/processing
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 800); // Simulate an 800ms delay
  };

  const getBotResponse = (messageText) => {
    const lowerCaseMessage = messageText.toLowerCase();

    // --- General Questions ---
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hi there! How can I assist you with your career journey?';
    }
    if (lowerCaseMessage.includes('what is careerquest') || lowerCaseMessage.includes('what are you')) {
      return 'CareerQuest helps you discover your ideal career path through a personalized questionnaire and recommendations.';
    }
    if (lowerCaseMessage.includes('careers') || lowerCaseMessage.includes('job opportunities')) {
      return 'Our recommendations are based on your skills and interests! After completing the questionnaire, we suggest suitable career paths.';
    }
    if (lowerCaseMessage.includes('questionnaire')) {
      return 'The questionnaire asks about your goals, work preferences, and skills to help us understand you better.';
    }
    if (lowerCaseMessage.includes('how does it work')) {
      return 'You answer a series of questions, and we use your responses to match you with career profiles that fit your unique attributes.';
    }
    if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help with?';
    }
    if (lowerCaseMessage.includes('contact support') || lowerCaseMessage.includes('help')) {
        return 'For direct assistance, please visit our Support page or email us at support@careerquest.com.';
    }
    if (lowerCaseMessage.includes('salary')) {
        return 'Our career recommendations include indicative salary ranges to give you an idea of potential earnings.';
    }

    // --- Advanced/Specific Questions (Rule-based simulation) ---
    if (lowerCaseMessage.includes('career advice') || lowerCaseMessage.includes('career path guidance')) {
      return 'I can give you general guidance. Are you looking for advice on specific industries, skill development, or interview tips?';
    }
    if (lowerCaseMessage.includes('skill development') || lowerCaseMessage.includes('learn new skills')) {
      return 'Focus on skills highly valued in your target career. Online courses and certifications are a great start! Would you like examples for a specific field?';
    }
    if (lowerCaseMessage.includes('interview tips')) {
      return 'For interviews, research the company, prepare answers for common questions, and practice your communication skills. I can offer more detailed tips if you need.';
    }
    if (lowerCaseMessage.includes('troubleshooting') || lowerCaseMessage.includes('problem with website')) {
      return 'I\'m sorry to hear you\'re having trouble. Could you please describe the issue in more detail? Sometimes refreshing the page or clearing your browser cache can help.';
    }
    if (lowerCaseMessage.includes('login') || lowerCaseMessage.includes('account')) {
      return 'To log in or manage your account, please use the "Log In" button in the header. If you\'ve forgotten your password, look for a "Forgot Password" link on the login page.';
    }

    // --- Fallback Response ---
    return 'I\'m still learning! Could you please rephrase your question or ask about "careers", "questionnaire", or "support"?';
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: { xs: 80, sm: 24 }, // Adjust bottom for mobile to avoid cookie banner
      right: 16,
      zIndex: 1400, // Below cookie banner, but above content
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    }}>
      {isOpen && (
        <Paper
          elevation={5}
          sx={{
            width: { xs: '90vw', sm: 350 },
            height: { xs: '70vh', sm: 450 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 2, // Space between chat window and Fab
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Chat Header */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>CareerQuest Bot</Typography>
            <IconButton onClick={toggleChat} color="inherit" size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              backgroundColor: theme.palette.grey[100], // Light background for messages
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 1.2,
                    borderRadius: 2,
                    maxWidth: '80%',
                    backgroundColor: msg.sender === 'user'
                      ? theme.palette.primary.light // User message color
                      : theme.palette.background.paper, // Bot message color
                    color: msg.sender === 'user'
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    wordBreak: 'break-word',
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} /> {/* Element to scroll to */}
          </Box>

          <Divider />

          {/* Input Area */}
          <Box sx={{ display: 'flex', p: 1.5, gap: 1, alignItems: 'center', backgroundColor: theme.palette.background.paper }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: theme.palette.grey[50],
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.grey[300],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={inputMessage.trim() === ''}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {/* Toggle Button */}
      <Tooltip title={isOpen ? "Close Chat" : "Open Chat"} placement="left">
        <Fab
          color="primary"
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            boxShadow: isOpen ? 'none' : theme.shadows[6], // Remove shadow when open
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default ChatWidget;