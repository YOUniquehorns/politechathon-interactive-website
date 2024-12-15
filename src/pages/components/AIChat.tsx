import React, {useState, useEffect, useRef} from 'react';
import {TextField, Button, Box, CircularProgress, Typography} from '@mui/material';
import OpenAI from 'openai';
import ChatApiClient from "../../clients/ChatApiClient";
import Markdown from "react-markdown";

interface AIChatProps {
    systemPrompt: string;
    firstQuestion?: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const AIChat: React.FC<AIChatProps> = ({systemPrompt, firstQuestion}) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const bbClient = new ChatApiClient();

    useEffect(() => {
        if (firstQuestion) {
            setMessages([{role: 'assistant', content: firstQuestion}]);
        }
    }, [firstQuestion]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSend = async () => {
            if (!input.trim()) return;

            try {
                setIsLoading(true);
                const userMessage = {role: 'user' as const, content: input};
                setMessages(prev => [...prev, userMessage]);
                setInput('');
                await bbClient.chatWithChatbot('5a19586d-2745-40eb-aba8-966d98764280', {
                        answerLanguage: "de", extra_param: "", personality_prompt: "",
                        question: systemPrompt + "  --- " + userMessage.content,
                        history: JSON.stringify(messages.map(m => {
                            const type = m.role === 'user' ? "human" : "ai"
                            return {
                                type: type,
                                data: {
                                    type: type,
                                    content: m.content
                                }
                            }
                        })),
                        userConfirmedPersonalDataProcessing: true,
                        chat_type: "QA"
                    },
                    (finalmessage) => {
                        console.log(finalmessage)
                        const message = JSON.parse(finalmessage)
                        setMessages(prev => [...prev, {role: 'assistant', content: message.result}])
                        setIsLoading(false);
                    }
                )
            } catch
                (error) {
                console.error('Error:', error);
                setIsLoading(false);
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Nachricht.'
                }]);
            }
        }
    ;

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Box sx={{
                mb: messages.length > 0 ? 2 : 0, 
                maxHeight: '400px', 
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: 1,
                p: messages.length > 0 ? 2 : 0
            }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            mb: 1,
                            p: 2,
                            bgcolor: message.role === 'user' 
                                ? '#e3f2fd'
                                : '#f3e5f5',
                            borderRadius: 1,
                            maxWidth: '80%',
                            ml: message.role === 'user' ? 'auto' : 0,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                            '& p': {
                                margin: '0.5em 0',
                                '&:first-of-type': {
                                    marginTop: 0,
                                },
                                '&:last-of-type': {
                                    marginBottom: 0,
                                }
                            }
                        }}
                    >
                        <Box>
                            <Typography 
                                component="div" 
                                sx={{
                                    color: message.role === 'user' 
                                        ? '#1565c0'
                                        : '#6a1b9a'
                                }}
                            >
                                <Markdown>{message.content
                                    .replaceAll("<br/>","\n\n")
                                    .replaceAll("<BBdqt>","\"")
                                    .replaceAll("<BBsqt>","\'")
                                }</Markdown>
                            </Typography>
                        </Box>
                    </Box>
                ))}

                {isLoading && (
                    <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                        <CircularProgress/>
                    </Box>
                )}
                <div ref={messageEndRef}/>
            </Box>
            <Box sx={{display: 'flex', gap: 1}}>
                <TextField
                    label="Nachricht eingeben..."
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    sx={{
                        '& label': {
                            color: 'black'
                        },
                        '& .MuiInputBase-input': {
                            color: 'black'
                        }
                    }}
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