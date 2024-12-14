import React from 'react';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material";
import Routing from "./routes/Routing";

function App() {


  const theme = createTheme({
    palette: {
      primary: {
        main: "#DF7C40"
      },
      secondary: {
        main: "#D1D3D5"
      },
      background: {
        paper: "#F2F0EE"
      }
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
