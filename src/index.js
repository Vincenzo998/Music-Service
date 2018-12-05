import 'babel-polyfill';
import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom';

import App from './components/App';

import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

render(
    <BrowserRouter>
        <App />
     </BrowserRouter>,
    document.getElementById('app')
);