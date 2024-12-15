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
          Von reaktiv zu aktiv: Dein Weg zum bewussten Nachrichtenkonsum
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Jetzt weißt du, wie Algorithmen und reaktiver Konsum dein Nachrichtenverhalten beeinflussen. 
          Zeit für einen Strategiewechsel!
        </Typography>

        <Box sx={{ bgcolor: 'success.light', p: 2, borderRadius: 1, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tipps für aktiven Nachrichtenkonsum:
          </Typography>
          <ul>
            <li>Feste Zeiten für Nachrichten einplanen</li>
            <li>Verschiedene Quellen nutzen</li>
            <li>Push-Benachrichtigungen reduzieren</li>
            <li>Bewusst nach anderen Perspektiven suchen</li>
          </ul>
        </Box>

        <Box sx={{ my: 4 }}>
          <AIChat
            systemPrompt="Du bist ein Coach für bewussten Medienkonsum. Hilf dem Nutzer, seinen Nachrichtenkonsum aktiver zu gestalten. Gib konkrete, praktische Tipps. Frage nach bisherigen Gewohnheiten und entwickle darauf aufbauend individuelle Strategien. Bleibe dabei motivierend und ermutigend."
            firstQuestion="Lass uns einen persönlichen Plan für deinen aktiven Nachrichtenkonsum entwickeln! Welche der bisherigen Gewohnheiten möchtest du als erstes ändern?"
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
            Zum Abschlussquiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourReflection; 