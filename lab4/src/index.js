import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './models/init'
import {ThemeProvider} from '@mui/styles'
import {createTheme} from '@mui/material'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={createTheme()}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
