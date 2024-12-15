import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ModuleFourAlgorithm = () => {
  const navigate = useNavigate();
  const [showExplanation, setShowExplanation] = useState(false);

  const feeds = [
    {
      user: "Anna",
      interests: "Sport, Gaming",
      articles: [
        "Neuer eSports-Rekord aufgestellt",
        "Fußball-Bundesliga Ergebnisse",
        "Gaming-PC oder Konsole?",
        "Top 10 Fitness-Apps 2024"
      ]
    },
    {
      user: "Max",
      interests: "Politik, Umwelt",
      articles: [
        "Neue Klimaschutz-Maßnahmen",
        "Wahlergebnisse aus der Region",
        "Umweltprotest in der Innenstadt",
        "Interview: Zukunft der Energiewende"
      ]
    }
  ];

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Filterblasen: Gleiche App, verschiedene Welten
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Anna und Max nutzen dieselbe News-App - und sehen trotzdem völlig unterschiedliche Inhalte.
          Algorithmen zeigen jedem User genau das, was zu seinen Interessen passt.
        </Typography>

        <Grid container spacing={4} sx={{ my: 3 }}>
          {feeds.map((feed, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {feed.user}s Feed
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Interessen: {feed.interests}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {feed.articles.map((article, i) => (
                      <Typography key={i} variant="body1" sx={{ mb: 1 }} color="text.secondary">
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
          Warum ist das gefährlich?
        </Button>

        {showExplanation && (
          <Box sx={{ bgcolor: 'error.light', p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body1" component="div">
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Filterblasen verstärken einseitige Sichtweisen</li>
                <li>Andere Perspektiven werden ausgeblendet</li>
                <li>Vorurteile können sich verstärken</li>
                <li>Der gesellschaftliche Dialog wird erschwert</li>
              </ul>
            </Typography>
          </Box>
        )}

        <Box sx={{ my: 4, bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Das hast du gelernt:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>
              <Typography variant="body1">
                Algorithmen personalisieren unseren Newsfeed
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Jeder User sieht andere Inhalte
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Filterblasen können zu einseitiger Information führen
              </Typography>
            </li>
          </ul>
        </Box>

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
            Weiter zu Lösungsstrategien
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourAlgorithm; 