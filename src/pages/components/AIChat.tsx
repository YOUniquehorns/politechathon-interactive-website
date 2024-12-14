import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import OpenAI from 'openai';

interface AIChatProps {
  systemPrompt: string;
  firstQuestion?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChat: React.FC<AIChatProps> = ({ systemPrompt, firstQuestion }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (firstQuestion) {
      setMessages([{ role: 'assistant', content: firstQuestion }]);
    }
  }, [firstQuestion]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { role: 'user' as const, content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
          userMessage
        ],
        model: 'gpt-4',
      });

      const assistantMessage = {
        role: 'assistant' as const,
        content: completion.choices[0].message.content || 'Keine Antwort erhalten.'
      };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Nachricht.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              mb: 1,
              p: 2,
              bgcolor: message.role === 'user' ? 'primary.light' : 'secondary.light',
              borderRadius: 1,
              maxWidth: '80%',
              ml: message.role === 'user' ? 'auto' : 0,
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="Nachricht eingeben..."
          variant="outlined"
          fullWidth
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          Senden
        </Button>
      </Box>
    </Box>
  );
};

export default AIChat; 