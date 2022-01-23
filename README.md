# механизм локализации audio

установка 
``
npm install https://github.com/ionson100/localisenode
``

Работает на клиенте и  сервере


### Использование клиент 
```javascript
/**
 * регистраия параметров транслятора
 * @def {sting} язык по умолчанию
 * @path {string} путь к файлу или директории с файлами json
 * @callback {function} функция обратного вызова, срабатывает после инициализаии словаря
 * @cookieName {string} названия куки
 */
exports.configLocale=function ({def,path,callback: callback,cookieName}){
     loc = new Localise({def:def,path:path,callback:callback,cookieName});
}
/**
 *
 * @key {string} ключ для перевода
 * @lan {string} язык перевода, при отсутствии - язык по умолчанию
 * @returns {string}
 */
exports.get=function (key,lan){
    return loc.get(key,lan)
}
```



index.js

```javascript
import {configLocale} from 'localisenode/dist/index'
const language='language' // название куки языка

let value = getCookie(language);
if(value===undefined){
    value="ru"
}

configLocale({def:value,path:"/localise/localise.json",callback:call,cookieName:language})

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
import {cookieName,get} from 'localisenode/dist/index'
import {useCookies} from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies([cookieName()]);
  let l=cookies[cookieName()];
  if(l===undefined){
    l="ru"
  }
  const [lang, setLang] = useState(l);
  
  function change(event){
    const s=event.target.value;
    setLang(s);
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

