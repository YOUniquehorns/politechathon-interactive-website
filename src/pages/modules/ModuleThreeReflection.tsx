import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const ModuleThreeReflection = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" gutterBottom sx={{ mt: 4 }}>
          Warum ist das wichtig? Fehlinformationen können das Vertrauen in Medien und Institutionen zerstören. Das beeinflusst Wahlen, politische Meinungen und öffentliche Debatten.
        </Typography>
        
        <Typography variant="body1" gutterBottom>
          Besonders in Zeiten von Krisen und wichtigen gesellschaftlichen Ereignissen nehmen Fake News zu. Sie verbreiten sich oft schneller als echte Nachrichten, weil sie gezielt unsere Emotionen ansprechen.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Reflexion: Deine Erfahrungen mit Fake News
          </Typography>
          <Typography variant="body1" gutterBottom>
            Jetzt wo du einige Beispiele gesehen hast, lass uns über deine persönlichen Erfahrungen sprechen. Der folgende Chat-Bot hilft dir dabei, deine eigenen Erlebnisse zu reflektieren.
          </Typography>
          <AIChat
            systemPrompt="Du bist ein empathischer Gesprächspartner, der Studenten hilft, über ihre Erfahrungen mit Fake News zu reflektieren. Stelle Fragen wie: 'Bist du schon mal auf Fake News hereingefallen?', 'Wie gehst du damit um, wenn du unsicher bist, ob eine Nachricht wahr ist?', 'Was sind deine Strategien, um Fake News zu erkennen?'"
            firstQuestion="Hallo! Lass uns über deine Erfahrungen mit Fake News sprechen. Kannst du dich an eine Situation erinnern, in der du auf Fake News gestoßen bist? Was ist da passiert?"
          />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-three')}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-three/experiment')}
          >
            Weiter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleThreeReflection; 