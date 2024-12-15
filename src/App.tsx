import React from 'react';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import Routing from "./routes/Routing";

function App() {


    const theme = createTheme({
        palette: {
            primary: {
                main: "#4E04B7"
            },
            secondary: {
                main: "#789D25"
            },
            text:{
                primary: "#ffffff",
            }
        },
        typography: {
        allVariants: {
            color: "white"
        },
    }
    });
    return (
        <>
            <ThemeProvider theme={theme}>
                <Routing/>
            </ThemeProvider>
        </>
    );
}

export default App;
