import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {addVideoClicked, resetVideoClicked} from "../../tools/progress-tracker";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const theVideoIds: Record<string, string[]> = {
    "0": [
        'jcNzoONhrmE', // Politik
        '5jqHZTz-2PM', // Katzen
        'jEGyK7e7POY'  // Wintersport
    ],
    "1": [
        '4GXrTXlsBmo', // Music
        'gT-2uXDk-zg', // CSD
        '9t-3_d_8wiE', // Mannschaftssport
    ],
    "2": [
        'WrsEmmz7dAg', // Kochen
        'MdQS6xA-R-w', // Basteln
        'gcHy5SCQab0', // e-Mobilität
    ]
}

const getClickedNameByVideoId = (videoId: string) => {
    switch (videoId) {
        case 'jcNzoONhrmE': return 'Politik';
        case '5jqHZTz-2PM': return 'Katzen';
        case 'jEGyK7e7POY': return 'Wintersport';
        case '4GXrTXlsBmo': return 'Music';
        case 'gT-2uXDk-zg': return 'CSD';
        case '9t-3_d_8wiE': return 'Mannschaftssport';
        case 'WrsEmmz7dAg': return 'Kochen';
        case 'MdQS6xA-R-w': return 'Basteln';
        case 'gcHy5SCQab0': return 'e-Mobilität';
        default: return '';
    }
}

const HorizontalYouTubeVideos: React.FC = () => {
    const navigate = useNavigate();
    const { nodeId } = useParams<{ nodeId: string }>();
    const [videoIds, setVideoIds] = useState<string[]>([]);

    const playerRefs = useRef<Array<any>>([]);
    const [navigated, setNavigated] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (nodeId === "0"){
            resetVideoClicked()
        }
    }, [nodeId]);

    useEffect(() => {
        if (nodeId) {
            setVideoIds(theVideoIds[nodeId] || []);
            setNavigated(false);
        }
    }, [nodeId]);

    const onPlayerStateChange = (event: any) => {
        const YT = window.YT;
        if (!YT) return;

        if (event.data === YT.PlayerState.PLAYING) {
            if (!timerRef.current && !navigated) {
                const videoId = event.target?.getVideoData()?.video_id;
                const clickedName = getClickedNameByVideoId(videoId);

                console.log(clickedName);
                addVideoClicked(clickedName);
                // Start a 2-second timer
                timerRef.current = setTimeout(() => {
                    if (!navigated) {
                        setNavigated(true);
                        const numericNodeId = Number(nodeId);
                        navigate('/session/intro/video/' + (numericNodeId + 1));
                    }
                }, 2000);
            }
        } else if (event.data === YT.PlayerState.ENDED) {
            if (!navigated) {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
                setNavigated(true);
                const numericNodeId = Number(nodeId);
                navigate('/session/intro/video/' + (numericNodeId + 1));
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(interval);
                videoIds.forEach((id, index) => {
                    const player = new window.YT.Player(`player-${id}`, {
                        videoId: id,
                        events: { 'onStateChange': onPlayerStateChange }
                    });
                    playerRefs.current.push(player);
                });
            }
        }, 100);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            // Destroy YouTube players on unmount
            playerRefs.current.forEach(player => player.destroy());
        };
    }, [navigate, navigated, videoIds, nodeId]);

    // Configuration for responsive layout
    const numberOfVideos = videoIds.length;
    const gap = 20; // Gap between videos in pixels
    const containerPadding = 80; // Total horizontal padding (20px left + 20px right)

    // Calculate the width for each video to fit within the container
    const calculateVideoWidth = () => {
        if (numberOfVideos === 0) return '0%';
        return `calc(${100 / numberOfVideos}% - ${(gap * (numberOfVideos - 1)) / numberOfVideos}px)`;
    };

    return (
        <div
            style={{
                display: 'flex',
                gap: `${gap}px`,
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                overflow: 'hidden', // Prevent horizontal scrollbar
                flexWrap: 'nowrap', // Ensure videos stay side-by-side
                boxSizing: 'border-box',
                width: '100vw' // Ensure container takes full viewport width
            }}
        >
            {videoIds && videoIds.map((id, index) => (
                <div
                    key={id}
                    style={{
                        flex: `0 0 ${calculateVideoWidth()}`, // Fixed width based on number of videos
                        aspectRatio: '9 / 16', // Maintain 16:9 aspect ratio
                        position: 'relative',
                        background: '#000'
                    }}
                >
                    <div
                        id={`player-${id}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default HorizontalYouTubeVideos;
