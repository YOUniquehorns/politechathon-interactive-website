import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const newsItems = [
  { id: 1, headline: 'Die große Ulmer Gurke wurde entdeckt!', isFake: true },
  { id: 2, headline: 'NASA landet erfolgreich auf dem Mars', isFake: false },
  { id: 3, headline: 'Neue Studie zeigt, dass Schokolade beim Abnehmen hilft', isFake: true },
  { id: 4, headline: 'Regierung plant Steuererleichterungen für Familien', isFake: false },
];

const ModuleHallucination = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [quizResponse, setQuizResponse] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    setResponse(`Deine Frage war: ${input}`);
  };

  const handleQuizClick = (id: number, isFake: boolean) => {
    setQuizResponse((prev) => ({ ...prev, [id]: isFake }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Fake News erkennen und vermeiden
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hey! Hast du schon mal von der „großen Ulmer Gurke“ gehört? Klingt verrückt, oder? Das ist ein Beispiel für Fake News.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Quiz Time:</strong> Wir zeigen dir verschiedene Schlagzeilen. Kannst du erraten, ob sie echt oder fake sind?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Warum ist das wichtig? Fehlinformationen können das Vertrauen in Medien und Institutionen zerstören. Das beeinflusst Wahlen, politische Meinungen und öffentliche Debatten.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Denk mal drüber nach: „Wie entscheidest du in Zukunft, ob eine Information glaubwürdig ist?“
          </Typography>
          <TextField
            label="Stell uns deine Frage"
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Senden
          </Button>
          {response && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'secondary.main', borderRadius: 1 }}>
              <Typography variant="body1">{response}</Typography>
            </Box>
          )}
          <Typography variant="h6" gutterBottom>
            Quiz: Echt oder Fake?
          </Typography>
          {newsItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography variant="body1">{item.headline}</Typography>
              <Button
                variant="contained"
                color={quizResponse[item.id] === true ? 'secondary' : 'primary'}
                onClick={() => handleQuizClick(item.id, true)}
                sx={{ mr: 1 }}
              >
                Fake
              </Button>
              <Button
                variant="contained"
                color={quizResponse[item.id] === false ? 'secondary' : 'primary'}
                onClick={() => handleQuizClick(item.id, false)}
              >
                Echt
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ModuleHallucination;