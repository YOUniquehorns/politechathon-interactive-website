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
        
        <Typography variant="h6" gutterBottom color="primary">
          Was ist reaktiver Nachrichtenkonsum?
        </Typography>

        <Typography variant="body1" gutterBottom>
          Scrollst du gedankenlos durch deinen Feed? Klickst du auf jede Push-Benachrichtigung? 
          Das ist reaktiver Nachrichtenkonsum - wenn Algorithmen und Zufälle bestimmen, was du siehst.
        </Typography>

        <Box sx={{ my: 4, bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Typische Merkmale:
          </Typography>
          <ul>
            <li>Zufälligkeit statt bewusste Auswahl</li>
            <li>Algorithmen bestimmen den Inhalt</li>
            <li>Kaum Überprüfung der Quellen</li>
            <li>Emotionale statt sachliche Inhalte</li>
          </ul>
        </Box>

        <Box sx={{ my: 4 }}>
          <AIChat
            systemPrompt="Du bist ein freundlicher Gesprächspartner, der Menschen hilft, ihr Nachrichtenkonsum-Verhalten zu reflektieren. Frage nach konkreten Beispielen wie: 'Wie oft checkst du Push-Nachrichten?', 'Welche News-Apps nutzt du?', 'Wann hast du zuletzt aktiv nach Nachrichten gesucht?'"
            firstQuestion="Hey! Lass uns mal analysieren, wie du Nachrichten konsumierst. Wie informierst du dich über das aktuelle Geschehen?"
          />
        </Box>

        <Box sx={{ my: 4, bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Das hast du gelernt:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>
              <Typography variant="body1">
                Reaktiver Nachrichtenkonsum bedeutet, dass wir passiv Informationen aufnehmen
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Algorithmen und Push-Benachrichtigungen steuern unseren Konsum
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Bewusstes Nachrichtenlesen ist wichtig für eine fundierte Meinungsbildung
              </Typography>
            </li>
          </ul>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/algorithm')}
          >
            Weiter zu Filterblasen & Algorithmen
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourIntro; 