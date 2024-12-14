import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const ModuleFourIntro = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Wirst du gesteuert oder steuerst du schon?
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <img 
            src="/images/reactive-consumption.svg" 
            alt="Person scrolling through social media feed" 
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </Box>

        <Typography variant="body1" gutterBottom>
          Wie oft scrollst du gedankenlos durch deinen Feed? Lass uns herausfinden, wie bewusst du Nachrichten konsumierst.
        </Typography>

        <Box sx={{ my: 4 }}>
          <AIChat
            systemPrompt="Du bist ein freundlicher Gesprächspartner, der Menschen hilft, ihr Nachrichtenkonsum-Verhalten zu reflektieren. Stelle kurze, prägnante Fragen wie: 'Wie informierst du dich über das aktuelle Geschehen?', 'Welche Apps/Plattformen nutzt du dafür?', 'Wie oft checkst du Nachrichten?'"
            firstQuestion="Hey! Lass uns mal über deinen Nachrichtenkonsum sprechen. Wie informierst du dich normalerweise über das aktuelle Geschehen?"
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/algorithm')}
          >
            Weiter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourIntro; 