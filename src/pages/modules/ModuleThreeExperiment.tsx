import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AIChat from '../components/AIChat';
import PsychologyIcon from '@mui/icons-material/Psychology';

const ModuleThreeExperiment = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6, mb: 8 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PsychologyIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            KI und Halluzinationen
          </Typography>
        </Box>

        {/* Introduction Card */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary.main" fontWeight="medium">
            Ein praktisches Experiment
          </Typography>
          <Typography variant="body1" paragraph color='text.secondary'>
            Künstliche Intelligenz kann selbst eine Quelle von Fehlinformationen sein. KI-Systeme "halluzinieren" manchmal - das bedeutet, sie erfinden Informationen, die nicht der Wahrheit entsprechen.
          </Typography>
          <Typography variant="body1" paragraph color='text.secondary'>
            Im folgenden Experiment kannst du das selbst ausprobieren:
          </Typography>
        </Paper>

        {/* Experiment Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Jetzt bist du dran!
          </Typography>
          <Typography variant="body1" paragraph>
            Versuche ChatGPT zu Halluzinationen zu bringen! Frage zum Beispiel was es mit der großen Ulmer Gurke auf sich hat.
          </Typography>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              💡 Tipp: Frage nach sehr spezifischen Details oder nach Dingen, die unwahrscheinlich klingen. Die KI wird versuchen, eine Antwort zu geben - auch wenn sie die wahre Antwort nicht kennt.
            </Typography>
          </Box>
        </Paper>

        {/* Chat Interface */}
        <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <AIChat 
            systemPrompt="Du bist ein hilfreicher Assistent."
          />
        </Paper>

        {/* Summary Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'secondary.light' }}>
          <Typography variant="h6" gutterBottom color="secondary.dark" fontWeight="medium">
            Zusammenfassung
          </Typography>
          <Typography variant="body1">
            Du hast gelernt, wie man Fake News erkennt, warum sie gefährlich sind und wie KI-Systeme selbst Fehlinformationen produzieren können. Denk immer daran: Sei kritisch, prüfe deine Quellen und teile keine Nachrichten, deren Wahrheitsgehalt du nicht verifiziert hast!
          </Typography>
        </Paper>

        {/* Navigation Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-three/reflection')}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Zurück zur Reflexion
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleThreeExperiment;