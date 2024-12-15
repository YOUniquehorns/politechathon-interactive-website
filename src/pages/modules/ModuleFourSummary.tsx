import React, { useState } from 'react';
import { Container, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const ModuleFourSummary = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: QuizQuestion[] = [
    {
      question: "Was ist reaktiver Nachrichtenkonsum?",
      options: [
        "Aktives Suchen nach verschiedenen Nachrichtenquellen",
        "Passives Konsumieren von Nachrichten durch Algorithmen und Zufälle",
        "Regelmäßiges Lesen der Tageszeitung",
        "Diskutieren von Nachrichten mit Freunden"
      ],
      correctAnswer: 1
    },
    {
      question: "Was ist eine Filterblase?",
      options: [
        "Ein Spam-Filter für E-Mails",
        "Eine App zum Filtern von Fake News",
        "Ein personalisierter Nachrichtenfeed, der nur bestimmte Perspektiven zeigt",
        "Ein Filter für Soziale Medien"
      ],
      correctAnswer: 2
    },
    {
      question: "Welche Strategie hilft NICHT gegen reaktiven Nachrichtenkonsum?",
      options: [
        "Verschiedene Nachrichtenquellen nutzen",
        "Push-Benachrichtigungen für alle News-Apps aktivieren",
        "Feste Zeiten für Nachrichten einplanen",
        "Bewusst nach anderen Perspektiven suchen"
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return correct;
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Zusammenfassung: Reaktiver Nachrichtenkonsum
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Teste dein Wissen über reaktiven Nachrichtenkonsum und Filterblasen!
        </Typography>

        <Box sx={{ my: 4, bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Dein Lernfortschritt:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
            <li>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                ✓ Reaktiven Nachrichtenkonsum erkannt
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                ✓ Gefahren von Filterblasen verstanden
              </Typography>
            </li>
            <li>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                ✓ Strategien für aktiven Konsum entwickelt
              </Typography>
            </li>
          </ul>
        </Box>

        <Box sx={{ my: 4 }}>
          {questions.map((q, questionIndex) => (
            <Box key={questionIndex} sx={{ 
              mb: 4, 
              bgcolor: 'grey.100', 
              p: 2, 
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                {q.question}
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[questionIndex] ?? -1}
                  onChange={(e) => handleAnswerChange(questionIndex, parseInt(e.target.value))}
                >
                  {q.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex}
                      control={<Radio />}
                      label={option}
                      sx={{
                        '.MuiFormControlLabel-label': {
                          color: showResults 
                            ? optionIndex === q.correctAnswer 
                              ? 'success.dark'
                              : answers[questionIndex] === optionIndex 
                                ? 'error.dark' 
                                : '#000000'
                            : '#000000'
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}

          {!showResults && (
            <Button
              variant="contained"
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length < questions.length}
              sx={{ mb: 3 }}
            >
              Auswerten
            </Button>
          )}

          {showResults && (
            <Box sx={{ 
              my: 4, 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              p: 2, 
              borderRadius: 1,
              boxShadow: 1
            }}>
              <Typography variant="h6" gutterBottom>
                Dein Ergebnis: {calculateScore()} von {questions.length} Punkten
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {calculateScore() === questions.length 
                  ? "Perfekt! Du hast alle Fragen richtig beantwortet!"
                  : calculateScore() > questions.length / 2
                    ? "Gut gemacht! Du hast die wichtigsten Konzepte verstanden."
                    : "Schau dir die Antworten noch einmal an und wiederhole bei Bedarf die Lektion."}
              </Typography>
              <Box sx={{ mt: 2 }}>
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
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-four/reflection')}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/podcast')}
          >
            Weiter zum Podcast
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourSummary; 