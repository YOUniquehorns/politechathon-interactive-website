import React, { useRef, useState } from 'react';
import { Container, Typography, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const ModuleFourPodcast = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Podcast: Filterblasen in sozialen Medien
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Höre dir den folgenden Podcast an, um noch mehr über die Auswirkungen von Filterblasen zu erfahren.
        </Typography>

        <Box sx={{ 
          p: 3, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4
        }}>
          <Box sx={{
            width: '200px',
            height: '200px',
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            mb: 2
          }}>
            <IconButton
              onClick={togglePlay}
              sx={{
                width: '80px',
                height: '80px',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              {isPlaying ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
            </IconButton>
          </Box>
          
          <audio
            ref={audioRef}
            src="/podcast.mp3"
            onEnded={() => setIsPlaying(false)}
          />
          
          <Typography variant="body2" color="text.primary">
            Dauer: 5:30 Minuten
          </Typography>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/module-four/summary')}
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
            onClick={() => navigate('/home')}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Lektionsübersicht
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModuleFourPodcast; 