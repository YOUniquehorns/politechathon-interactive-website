import {useState, useEffect} from 'react';

const LECTURE_PROGRESS_KEY = 'lectureProgress';

interface LectureProgress {
    [lectureId: string]: number; // percentage done
}

export const useModuleProgress = (lectureId: string) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const storedProgress = localStorage.getItem(LECTURE_PROGRESS_KEY);
        const parsedProgress: LectureProgress = storedProgress ? JSON.parse(storedProgress) : {};
        setProgress(parsedProgress[lectureId] || 0);
    }, [lectureId]);

    const markModuleProgress = (percentage: number) => {
        const storedProgress = localStorage.getItem(LECTURE_PROGRESS_KEY);
        const parsedProgress: LectureProgress = storedProgress ? JSON.parse(storedProgress) : {};
        parsedProgress[lectureId] = percentage;
        localStorage.setItem(LECTURE_PROGRESS_KEY, JSON.stringify(parsedProgress));
        setProgress(percentage);
    };

    return {progress, markModuleProgress};
}

const VIDEO_CLICKED_KEY = 'videoClicked';

export const getClickedVideos = (): string[] => {
        const storedClickedVideos = localStorage.getItem(VIDEO_CLICKED_KEY);
    return storedClickedVideos ? JSON.parse(storedClickedVideos) : [];
};

export const addVideoClicked = (videoId: string): void => {
        const storedClickedVideos = localStorage.getItem(VIDEO_CLICKED_KEY);
        const parsedClickedVideos: string[] = storedClickedVideos ? JSON.parse(storedClickedVideos) : [];
        if (!parsedClickedVideos.includes(videoId)) {
            parsedClickedVideos.push(videoId);
            localStorage.setItem(VIDEO_CLICKED_KEY, JSON.stringify(parsedClickedVideos));
        }
    };