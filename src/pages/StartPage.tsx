import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Willkommen zum MedienMäntor!
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Lerne, wie du Halluzinationen von KI-Systemen und Filterblasen erkennst.
        </Typography>

        <Box
          component="img"
          sx={{
            maxWidth: '30%',
            height: 'auto',
            borderRadius: 2,
            my: 4
          }}
          src="logo.png"
          alt="Willkommensbild"
        />

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/home')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Kurs starten
        </Button>
      </Box>
    </Container>
  );
};

export default StartPage; 