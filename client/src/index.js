import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configLocale} from './localise/index'


let value = ('; '+document.cookie).split(`; assa=`).pop().split(';')[0];
if(value===undefined){
    value="ru"
}

configLocale({def:value,path:"/localise/localise.json",callback:call,cookieName:"assa"})


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
