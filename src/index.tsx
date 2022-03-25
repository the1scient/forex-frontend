import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

// create a function called renderToDOM that will render the App component to the DOM

  
function renderToDOM() {
    ReactDOM.render(

        (<App />),

        document.getElementById('root')
    );
}

renderToDOM();

export {renderToDOM};