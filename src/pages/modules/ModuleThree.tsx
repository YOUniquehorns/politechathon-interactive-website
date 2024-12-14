import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AIChat from '../components/AIChat';
import FakeNewsQuiz from '../components/FakeNewsQuiz'

const ModuleHallucination = () => {
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
          <strong>Quiz Time:</strong> Wir zeigen dir verschiedene Schlagzeilen. Kannst du erraten, ob sie echt oder fake sind?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Warum ist das wichtig? Fehlinformationen können das Vertrauen in Medien und Institutionen zerstören. Das beeinflusst Wahlen, politische Meinungen und öffentliche Debatten.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <FakeNewsQuiz />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Jetzt bist du dran. Versuche die KI zu Halluzinationen zu bringen!
          </Typography>
          <AIChat 
            systemPrompt="Du bist ein hilfreicher Assistent, der dabei hilft, Fake News zu erkennen und kritisch zu denken."
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleHallucination;