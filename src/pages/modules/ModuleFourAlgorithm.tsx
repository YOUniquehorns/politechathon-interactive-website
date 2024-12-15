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
      <Box sx={{ mt: 4, maxWidth: '900px', mx: 'auto' }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #C8E97D 30%, #E8F5D6 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 3
          }}
        >
          Filterblasen: Gleiche App, verschiedene Welten
        </Typography>

        <Typography 
          variant="body1" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'white' 
          }}
        >
          Anna und Max nutzen dieselbe News-App - und sehen trotzdem völlig unterschiedliche Inhalte.
          Algorithmen zeigen jedem User genau das, was zu seinen Interessen passt.
        </Typography>

        <Grid container spacing={4} sx={{ my: 3 }}>
          {feeds.map((feed, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                elevation={3}
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      pb: 1,
                      mb: 2
                    }}
                  >
                    {feed.user}s Feed
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      mb: 2,
                      fontStyle: 'italic'
                    }}
                  >
                    Interessen: {feed.interests}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {feed.articles.map((article, i) => (
                      <Typography 
                        key={i} 
                        variant="body1" 
                        sx={{ 
                          mb: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          color: '#000000',
                          '&:before': {
                            content: '"•"',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            mr: 1
                          }
                        }}
                      >
                        {article}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button 
          variant="contained"
          onClick={() => setShowExplanation(!showExplanation)}
          sx={{ 
            mb: 3,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          {showExplanation ? 'Erklärung ausblenden' : 'Warum ist das gefährlich?'}
        </Button>

        {showExplanation && (
          <Box 
            sx={{ 
              bgcolor: 'primary.light',
              p: 3,
              borderRadius: 2,
              mb: 3,
              boxShadow: 2,
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            <Typography variant="body1" component="div">
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {[
                  'Filterblasen verstärken einseitige Sichtweisen',
                  'Andere Perspektiven werden ausgeblendet',
                  'Vorurteile können sich verstärken',
                  'Der gesellschaftliche Dialog wird erschwert'
                ].map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                ))}
              </ul>
            </Typography>
          </Box>
        )}

        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          justifyContent: 'space-between',
          gap: 2 
        }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four')}
            sx={{
              background: '#000000',
              boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
              '&:hover': {
                background: '#333333',
              }
            }}
          >
            Zurück
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/reflection')}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Weiter zu Lösungsstrategien
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourAlgorithm; 