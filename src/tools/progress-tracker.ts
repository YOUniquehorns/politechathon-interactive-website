import { useState, useEffect } from 'react';

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

  return { progress, markModuleProgress };
};