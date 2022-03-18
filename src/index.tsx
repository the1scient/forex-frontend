import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();


ReactDOM.render(
<MuiThemeProvider theme={theme}>
    <App />
</MuiThemeProvider>,
  document.getElementById('root')
);
