import ModuleTwo from "../pages/modules/ModuleTwo";
import ModuleOne from "../pages/modules/ModuleOne";
import GraphPage from "../pages/components/GraphPage";
import ModuleThreeIntro from '../pages/modules/ModuleThreeIntro';
import ModuleThreeReflection from '../pages/modules/ModuleThreeReflection';
import ModuleThreeExperiment from '../pages/modules/ModuleThreeExperiment';
import React from "react";
import HorizontalYouTubeVideos from "../pages/components/HorizontalYouTubeVideos";
import StartPage from '../pages/StartPage';

export interface ManagedRoute {
    path: string
    name?: string,
    child: JSX.Element
}

export const routes: (ManagedRoute)[] = [
    {
        path: '/',
        name: "Start",
        child: <StartPage />
    },
    {
        path: "/home",
        name: "Home",
        child: <GraphPage />,
    },
    {
        path: "/modules/one",
        name: "Module One",
        child: <ModuleOne />,
    },
    {
        path: "/modules/two",
        name: "Module Two",
        child: <ModuleTwo />,
    },
    {
        path: "/other/:nodeId",
        name: "Module Two",
        child: <ModuleThreeIntro />,
    },
    {
        path: '/module-three',
        name: "Module Three - Intro",
        child: <ModuleThreeIntro />
    },
    {
        path: '/module-three/reflection',
        name: "Module Three - Reflection",
        child: <ModuleThreeReflection />
    },
    {
        path: '/module-three/experiment',
        name: "Module Three - Experiment",
        child: <ModuleThreeExperiment />
    },
    {
        path: "/session/intro/video1",
        name: "VideoPage1",
        child: <HorizontalYouTubeVideos />,
    },
]
