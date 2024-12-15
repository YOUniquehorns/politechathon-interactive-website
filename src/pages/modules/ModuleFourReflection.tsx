import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const ModuleFourReflection = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6, mb: 8 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <AutoStoriesIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Von reaktiv zu aktiv: Dein Weg zum bewussten Nachrichtenkonsum
          </Typography>
        </Box>

        {/* Introduction Card */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary.main" fontWeight="medium">
            Zeit für Veränderung
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Jetzt weißt du, wie Algorithmen und reaktiver Konsum dein Nachrichtenverhalten beeinflussen. 
            Zeit für einen Strategiewechsel!
          </Typography>
        </Paper>

        {/* Tips Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'success.light' }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Tipps für aktiven Nachrichtenkonsum:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <ul style={{ margin: '0.5rem 0' }}>
              <li>Feste Zeiten für Nachrichten einplanen</li>
              <li>Verschiedene Quellen nutzen</li>
              <li>Push-Benachrichtigungen reduzieren</li>
              <li>Bewusst nach anderen Perspektiven suchen</li>
            </ul>
          </Box>
        </Paper>

        {/* Chat Interface */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary.main" fontWeight="medium">
            Entwickle deinen persönlichen Plan
          </Typography>
          <AIChat
            systemPrompt="Du bist ein Coach für bewussten Medienkonsum. Hilf dem Nutzer, seinen Nachrichtenkonsum aktiver zu gestalten. Gib konkrete, praktische Tipps. Frage nach bisherigen Gewohnheiten und entwickle darauf aufbauend individuelle Strategien. Bleibe dabei motivierend und ermutigend."
            firstQuestion="Lass uns einen persönlichen Plan für deinen aktiven Nachrichtenkonsum entwickeln! Welche der bisherigen Gewohnheiten möchtest du als erstes ändern?"
          />
        </Paper>

        {/* Navigation Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-four/algorithm')}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/summary')}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Zum Abschlussquiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourReflection; 