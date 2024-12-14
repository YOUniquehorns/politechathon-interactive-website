import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const ModuleFourReflection = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Von reaktiv zu aktiv
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lass uns gemeinsam Strategien entwickeln, wie du deinen Nachrichtenkonsum bewusster gestalten kannst.
        </Typography>

        <Box sx={{ my: 4 }}>
          <AIChat
            systemPrompt="Du bist ein Coach für bewussten Medienkonsum. Hilf dem Nutzer, seinen Nachrichtenkonsum aktiver zu gestalten. Gib konkrete, praktische Tipps. Frage nach bisherigen Gewohnheiten und entwickle darauf aufbauend individuelle Strategien."
            firstQuestion="Was möchtest du an deinem Nachrichtenkonsum ändern? Lass uns gemeinsam einen Plan entwickeln, wie du bewusster mit Nachrichten umgehen kannst."
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-four/algorithm')}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/summary')}
          >
            Zusammenfassung
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourReflection; 