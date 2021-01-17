import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, makeStyles, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
  
  palette: {
    
  },
  typography: {
    h2: {
      fontFamily: [
        'Lora',
      ]
    },
    p: {
      fontFamily: [
        'Montserrat',
      ]
    }
    
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme = { theme }>
    <App />
    </MuiThemeProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
