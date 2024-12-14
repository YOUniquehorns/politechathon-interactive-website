import {Box} from '@mui/material';
import * as React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {routes} from "./routes";

export interface IRootProps {
}

const Routing: React.FunctionComponent<IRootProps> = (props: IRootProps) => {


    const displayedRoutes: JSX.Element[] = []
    routes.forEach(route => {
        displayedRoutes.push(<Route key={route.path} path={route.path} element={route.child}/>)
    })

    // displayedRoutes.push(<Route key="404" path="*" element={<RouteContent route={{
    //     child: < Page404 />,
    //     path: "*"
    // }} />} />)

    return (<Box sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        minHeight: "100vh"
    }} component="div">
        <BrowserRouter>
            <React.Suspense fallback={
                <></>
            }>
                <Routes>
                    {displayedRoutes}
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    </Box>)
}

export default Routing;