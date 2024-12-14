import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FakeNewsQuiz from '../components/FakeNewsQuiz';

const ModuleThreeIntro = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Fake News erkennen und vermeiden
        </Typography>
        <Typography variant="body1" gutterBottom>
          Hey! Hast du schon mal von der „großen Ulmer Gurke" gehört? Klingt verrückt, oder? Das ist ein Beispiel für Fake News.
        </Typography>
        <Typography variant="body1" gutterBottom>
          In dieser Lektion lernst du, wie du Fake News erkennst und dich vor Fehlinformationen schützen kannst. Fake News sind oft sensationell aufgemacht und sprechen unsere Emotionen an - genau wie die Geschichte der Ulmer Gurke!
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mt: 3 }}>
          <strong>Quiz Time:</strong> Wir zeigen dir verschiedene Schlagzeilen. Kannst du erraten, ob sie echt oder fake sind?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tipp: Achte besonders auf emotionale Sprache, übertriebene Behauptungen und prüfe immer die Quelle!
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <FakeNewsQuiz />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-three/reflection')}
          >
            Weiter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleThreeIntro; 