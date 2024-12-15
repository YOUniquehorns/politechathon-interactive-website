import {Box, IconButton, Menu, MenuItem} from '@mui/material';
import * as React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {routes} from "./routes";
import {useState} from "react";
import LanguageIcon from "@mui/icons-material/Language";
import {DE, GB} from "country-flag-icons/react/3x2";

export interface IRootProps {
}


const LanguageIcons = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{position: 'fixed', top: 16, left: 16}}>
            <IconButton onClick={handleClick} color={'primary'}>
                <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" alt="DE" style={{ width: 24, height: 16, marginRight: 8 }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" alt="DE" style={{ width: 24, height: 16, marginRight: 8 }} />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="GB" style={{width: 24, height: 16, marginRight: 8}}/>
                </MenuItem>
            </Menu>
        </Box>
    );
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
        <LanguageIcons/>
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