import Home from "../pages/home/Home";
import ModuleTwo from "../pages/modules/ModuleTwo";
import ModuleOne from "../pages/modules/ModuleOne";

export interface ManagedRoute {
    path: string
    name?: string,
    child: JSX.Element
}

export const routes: (ManagedRoute)[] = [
    {
        path: "/",
        name: "Home",
        child: <Home />,
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
]
