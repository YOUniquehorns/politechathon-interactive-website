import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface VideoData {
    id: string;
    tiktokUrl: string;
    tiktokVideoId: string;
    previewImg: string;
}

const videoList: VideoData[] = [
    {
        id: 'video1',
        tiktokUrl: 'https://www.tiktok.com/@dailymail/video/7445756488855113006',
        tiktokVideoId: '6718335390845095173',
        previewImg: 'https://via.placeholder.com/325x574.png?text=Preview+1'
    },
    {
        id: 'video2',
        tiktokUrl: 'https://www.tiktok.com/@scout2015/video/6807491984882765062',
        tiktokVideoId: '6807491984882765062',
        previewImg: 'https://via.placeholder.com/325x574.png?text=Preview+2'
    },
    {
        id: 'video3',
        tiktokUrl: 'https://www.tiktok.com/@scout2015/video/6814301138423012613',
        tiktokVideoId: '6814301138423012613',
        previewImg: 'https://via.placeholder.com/325x574.png?text=Preview+3'
    }
];

const VideosPage1: React.FC = () => {
    const navigate = useNavigate();
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    useEffect(() => {
        if (playingVideoId) {
            // After starting "play," navigate after a few seconds (simulate watching)
            const timer = setTimeout(() => {
                navigate('/next');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [playingVideoId, navigate]);

    useEffect(() => {
        if (playingVideoId) {
            // Re-inject the TikTok embed script to process the new blockquote
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);

            // Clean up: optional, in case we navigate away
            return () => {
                // Removing the script is optional, you might leave it if you prefer
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        }
    }, [playingVideoId]);

    const handleVideoClick = (videoId: string) => {
        setPlayingVideoId(videoId);
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            {videoList.map((video) => (
                <div
                    key={video.id}
                    style={{
                        border: playingVideoId === video.id ? '3px solid red' : '1px solid #ccc',
                        cursor: 'pointer',
                        width: '325px',
                        height: '574px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onClick={() => handleVideoClick(video.id)}
                >
                    {playingVideoId === video.id ? (
                        // Show TikTok embed
                        <blockquote
                            className="tiktok-embed"
                            cite={video.tiktokUrl}
                            data-video-id={video.tiktokVideoId}
                            style={{ width: '325px', height: '574px' }}
                        ></blockquote>
                    ) : (
                        // Show preview image
                        <img
                            src={video.previewImg}
                            alt="Video preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default VideosPage1;
