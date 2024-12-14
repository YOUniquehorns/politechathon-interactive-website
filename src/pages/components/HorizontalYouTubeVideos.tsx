import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const HorizontalYouTubeVideos: React.FC = () => {
    const navigate = useNavigate();
    const videoIds = [
        'jcNzoONhrmE', // Example 1
        '5jqHZTz-2PM', // Example 2
        'jEGyK7e7POY'  // Example 3
    ];

    const playerRefs = useRef<Array<any>>([]);
    const [timerStarted, setTimerStarted] = useState(false);
    const [navigated, setNavigated] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerStarted) {
            // Start a 3 second timer
            setTimeout(() => {
                if (!navigated) {
                    setNavigated(true);
                    navigate('/next');
                }
            }, 3000);
        }
    }, [timerStarted]);

    useEffect(() => {
        const onPlayerStateChange = (event: any) => {
            const YT = window.YT;
            if (!YT) return;

            // YouTube player states:
            // -1 (unstarted)
            // 0 (ended)
            // 1 (playing)
            // 2 (paused)
            // 3 (buffering)
            // 5 (video cued)

            if (event.data === YT.PlayerState.PLAYING) {
                // Once a video starts playing, if we haven't started the timer, start it now.
                if (!timerStarted && !navigated) {
                    setTimerStarted(true);
                }
            } else if (event.data === YT.PlayerState.ENDED) {
                // If the video ends before 3 seconds, navigate immediately.
                if (!navigated) {
                    if (timerRef.current) {
                        clearTimeout(timerRef.current);
                    }
                    setNavigated(true);
                    navigate('/next');
                }
            }
        };

        // Poll until the YouTube API is ready, then create players
        const interval = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(interval);
                videoIds.forEach((id, index) => {
                    const player = new window.YT.Player(`player-${index}`, {
                        videoId: id,
                        events: {
                            'onStateChange': onPlayerStateChange
                        }
                    });
                    playerRefs.current.push(player);
                });
            }
        }, 100);

        return () => {
            // Cleanup on component unmount
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [navigate, navigated, timerStarted, videoIds]);

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {videoIds.map((id, index) => (
                <div key={id}>
                    {/* Player container - the YT Player will be injected here */}
                    <div id={`player-${index}`} style={{ width: "325px", height: "574px" }}></div>
                </div>
            ))}
        </div>
    );
};

export default HorizontalYouTubeVideos;
