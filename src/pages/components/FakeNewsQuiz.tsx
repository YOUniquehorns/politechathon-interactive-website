import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';

interface NewsItem {
  id: number;
  headline: string;
  isFake: boolean;
}

const newsItems: NewsItem[] = [
  { id: 1, headline: 'Die große Ulmer Gurke wurde entdeckt!', isFake: true },
  { id: 2, headline: 'NASA landet erfolgreich auf dem Mars', isFake: false },
  { id: 3, headline: 'Neue Studie zeigt, dass Schokolade beim Abnehmen hilft', isFake: true },
  { id: 4, headline: 'Regierung plant Steuererleichterungen für Familien', isFake: false },
];

const FakeNewsQuiz = () => {
  const [quizResponse, setQuizResponse] = useState<{ [key: number]: boolean }>({});

  const handleQuizClick = (id: number, isFake: boolean) => {
    setQuizResponse((prev) => ({ ...prev, [id]: isFake }));
  };

  return (
    <Box>
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
  );
};

export default FakeNewsQuiz; 