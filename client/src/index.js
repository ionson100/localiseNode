import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configLocale} from './localise/index'
import {CookiesProvider} from "react-cookie";

configLocale({def:"ru",path:"/localise/localise.json",callback:call})


function call(){
    ReactDOM.render(
        <React.StrictMode>

                <App />


        </React.StrictMode>,
        document.getElementById('root')
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
