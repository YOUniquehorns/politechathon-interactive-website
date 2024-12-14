import ModuleTwo from "../pages/modules/ModuleTwo";
import ModuleOne from "../pages/modules/ModuleOne";
import OtherPage from "../pages/components/OtherPage";
import GraphPage from "../pages/components/GraphPage";

export interface ManagedRoute {
    path: string
    name?: string,
    child: JSX.Element
}

export const routes: (ManagedRoute)[] = [
    {
        path: "/",
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
        child: <OtherPage />,
    },
]
