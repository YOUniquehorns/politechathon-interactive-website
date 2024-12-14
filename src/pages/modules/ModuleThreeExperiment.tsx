import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';

const ModuleThreeExperiment = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          KI und Halluzinationen - Ein praktisches Experiment
        </Typography>
        <Typography variant="body1" gutterBottom>
          Künstliche Intelligenz kann selbst eine Quelle von Fehlinformationen sein. KI-Systeme "halluzinieren" manchmal - das bedeutet, sie erfinden Informationen, die nicht der Wahrheit entsprechen.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Im folgenden Experiment kannst du das selbst ausprobieren:
        </Typography>
        <Typography variant="h6" gutterBottom>
          Jetzt bist du dran. Versuche ChatGPT zu Halluzinationen zu bringen! Frage zum Beispiel was es mit der großen Ulmer Gurke auf sich hat.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tipp: Frage nach sehr spezifischen Details oder nach Dingen, die unwahrscheinlich klingen. Die KI wird versuchen, eine Antwort zu geben - auch wenn sie die wahre Antwort nicht kennt.
        </Typography>
        <AIChat 
          systemPrompt="Du bist ein hilfreicher Assistent."
        />

        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Zusammenfassung
          </Typography>
          <Typography variant="body1" gutterBottom>
            Du hast gelernt, wie man Fake News erkennt, warum sie gefährlich sind und wie KI-Systeme selbst Fehlinformationen produzieren können. Denk immer daran: Sei kritisch, prüfe deine Quellen und teile keine Nachrichten, deren Wahrheitsgehalt du nicht verifiziert hast!
          </Typography>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-three/reflection')}
          >
            Zurück
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleThreeExperiment; 