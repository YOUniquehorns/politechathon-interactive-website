import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModuleFourAlgorithm = () => {
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);

  const feeds = [
    {
      user: "Person A",
      interests: "Sport, Gaming",
      articles: [
        "Neuer eSports-Rekord aufgestellt",
        "Fußball-Bundesliga Ergebnisse",
        "Gaming-PC oder Konsole?",
      ]
    },
    {
      user: "Person B",
      interests: "Politik, Umwelt",
      articles: [
        "Neue Klimaschutz-Maßnahmen",
        "Wahlergebnisse aus der Region",
        "Umweltprotest in der Innenstadt",
      ]
    }
  ];

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Der gleiche Feed - verschiedene Welten
        </Typography>

        <Grid container spacing={4} sx={{ my: 3 }}>
          {feeds.map((feed, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feed.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Interessen: {feed.interests}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {feed.articles.map((article, i) => (
                      <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                        • {article}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button 
          variant="outlined" 
          onClick={() => setShowExplanation(!showExplanation)}
          sx={{ mb: 3 }}
        >
          Was bedeutet das?
        </Button>

        {showExplanation && (
          <Typography variant="body1" sx={{ mb: 3 }}>
            Algorithmen zeigen jedem Nutzer unterschiedliche Inhalte basierend auf persönlichen Interessen und Verhalten. 
            Das führt zu "Filterblasen" - wir sehen nur noch das, was zu unseren Ansichten passt.
          </Typography>
        )}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/module-four')}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/reflection')}
          >
            Weiter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourAlgorithm; 