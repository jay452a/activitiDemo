import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';

import { BrowserRouter as Router,Route,Link   } from "react-router-dom";

import registerServiceWorker from './registerServiceWorker';






ReactDOM.render(<App name="react-router-test"/>, document.getElementById('root'));
registerServiceWorker();
