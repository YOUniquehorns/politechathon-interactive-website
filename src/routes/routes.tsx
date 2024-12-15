import ModuleTwo from "../pages/modules/ModuleTwo";
import ModuleOne from "../pages/modules/ModuleOne";
import GraphPage from "../pages/components/GraphPage";
import ModuleThreeIntro from '../pages/modules/ModuleThreeIntro';
import ModuleThreeReflection from '../pages/modules/ModuleThreeReflection';
import ModuleThreeExperiment from '../pages/modules/ModuleThreeExperiment';
import React from "react";
import HorizontalYouTubeVideos from "../pages/components/HorizontalYouTubeVideos";
import StartPage from '../pages/StartPage';
import ModuleFourIntro from '../pages/modules/ModuleFourIntro';
import ModuleFourAlgorithm from '../pages/modules/ModuleFourAlgorithm';
import ModuleFourReflection from '../pages/modules/ModuleFourReflection';
import ModuleFourSummary from '../pages/modules/ModuleFourSummary';
import ModuleFourPodcast from '../pages/modules/ModuleFourPodcast';
import TreePage from "../pages/components/TreePage";

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
    {
        path: '/module-four',
        name: "Module Four - Intro",
        child: <ModuleFourIntro />
    },
    {
        path: '/module-four/algorithm',
        name: "Module Four - Algorithm",
        child: <ModuleFourAlgorithm />
    },
    {
        path: '/module-four/reflection',
        name: "Module Four - Reflection",
        child: <ModuleFourReflection />
    },
    {
        path: '/module-four/summary',
        name: "Module Four - Summary",
        child: <ModuleFourSummary />
    },
    {
        path: '/module-four/podcast',
        name: "Module Four - Podcast",
        child: <ModuleFourPodcast />
    },
    {
        path: "/treepage",
        name: "TreePage",
        child: <TreePage />,
    },
]
