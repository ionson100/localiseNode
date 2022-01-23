# механизм локализации audio

установка 
``
npm install https://github.com/ionson100/localisenode
``

Работает на клиенте и  сервере


### Использование клиент 
index.js

```javascript
import {configLocale} from 'localisenode/dist/index'
const language='language' // название куки языка

let value = getCookie(language);
if(value===undefined){
    value="ru"
}

configLocale({def:value,path:"/localise/localise.json",callback:call,cookiesName:language})

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function call(){// после создания словаря продолжаем визуализацию
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
```
app.js
```javascript
import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {cookiesName,get} from 'localisenode/dist/index'
import {useCookies} from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies([cookiesName()]);
  let l=cookies[cookiesName()];
  if(l===undefined){
    l="ru"
  }
  const [lang, setLang] = useState(l);
  
  function change(event){
    const s=event.target.value;
    setLang(s);
    console.log("###",s)
    setCookie(cookiesName(), s, { path: '/' });
  }
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{get("просто",lang)}</p>
          <p>{get("Большой",lang)}</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <p><select style={{fontSize:30,width:400}} size="3"   onChange={change} value={lang}>
            <option disabled>Выберите язык</option>
            <option value="ru">Русский</option>
            <option  value="en">Английский</option>
          </select></p>
        </header>
      </div>
  );
}
export default App;
```


### файл Json локализации
```json
[
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "", "value": {"ru": "", "en": ""}},
    {"key": "Просто", "value": {"ru": "Просто так", "en": "Simple"}},
    {"key": "Большой", "value": {"ru": "Большой ION", "en": "Big ION"}}

]
```

