import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

import {cookieName,getCore} from './localise/index'
import {useCookies} from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies([cookieName()]);
  let l=cookies[cookieName()];
  if(l===undefined){
    l="ru"
  }
  const [lanq, setLanq] = useState(l);


  function change(event){

    const s=event.target.value;
    setLanq(s);
    console.log("###",s)
    setCookie(cookieName(), s, { path: '/' });

  }


  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{getCore("просто",lanq)}</p>
          <p>{getCore("Большой",lanq)}</p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >

            Learn React
          </a>
          <p><select style={{fontSize:30,width:400}} size="3"   onChange={change} value={lanq}>
            <option disabled>Выберите язык</option>
            <option value="ru">Русский</option>
            <option  value="en">Английский</option>

          </select></p>

        </header>

      </div>
  );
}

export default App;
