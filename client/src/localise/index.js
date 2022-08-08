function is_server() {
    return ! (typeof window != 'undefined' && window.document);
}
let _cookieName
class Localise{
    constructor({def,path,callback,cookieName}) {
        this._def = def;
        this._callback = callback;
        _cookieName=cookieName
        this._path = path;// папка или файл с локализованным json
        this.map=new Map();// словарь трансляции
        this.init();
    }
    get(key,lang){
        try{
            const keyCore=key.toLowerCase();
            if(this.map.has(keyCore)){// если ключ есть в словаре
                const v=this.map.get(keyCore)[lang]//значение по запросу
                const vd=this.map.get(keyCore)[this._def]// значение по умолчанию
                if(v===undefined){ //значение по запросу отсутствует
                    if(vd===undefined){// дефолтное значение отсутствует
                        return key;
                    }else{
                        return vd;
                    }
                }else{// ключа нет в словаре
                    return v;
                }
            }else{
                return key;
            }
        }catch (ex){
          console.error(`Ошибка при поиске значения локализации: ${ex}`)
        }
    }
    init(){
        if(this._path===undefined){
            console.error("Путь к директории или файлу локализации не обозначен")
        }
        if(is_server()===true){
            try{
                const Path = require("path");
                const fs = require("fs");
                const pp=this._path;
                const m=this.map;
                fs.stat(this._path, (err, stats) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    if(stats.isFile()===true){// если файл
                        builderMap(fs,pp,m)
                    }
                    if(stats.isDirectory()){// если директроия, читаем все файлы из директроии  заносим их в словарь

                        fs.readdir(this._path, function (err, files) {
                            if (err) {
                                return console.log('Ошибка чтения списка файлов из директории: ' + err);
                            }else {
                                files.forEach( (file) =>{
                                    builderMap(fs,Path.join(pp,file),m)
                                });
                            }
                        });
                    }
                })
            }catch (exception){
              console.error(`Init server localise error: ${exception.trace}`)
            }
        }else{
           myFetchLocale(this._path).then(value => {
               Array.from(value).map((v)=>{
                   if(!v.key.toLowerCase()) return false;
                   if( this.map.has(v.key.toLowerCase())===true){ //если ключ пустой пропускаем
                       console.log(` Файл локализации, обнаружено совпадение ключей ${v.key.toLowerCase()}  `);
                   }else{
                       this.map.set(v.key.toLowerCase(),v.value)
                   }
                   console.log(v.key.toLowerCase());
               })
               console.log("map  ",this.map)
           }).catch(error => {
               console.error(error);
           }).finally(() => {
               if(this._callback){
                   this._callback();
               }
           })
        }
    }
}
async function myFetchLocale(path) {
    const response = await fetch(path);
    const body = await response.json();
    if (response.status !== 200) {
         throw (`Загрузка локализации на клиенте ${body.message}`)
    }
    console.log(body)
        return body;
}
function builderMap(fs,file,map){
    fs.readFile(file, "utf8",
        function(error,data){
            if(error) {
                console.log(` Ошибка Асинхронное чтение файла ${data}  ${error}`);
            }else{
                try{
                   let f= JSON.parse(data);
                   Array.from(f).map((v)=>{
                       if(!v.key.toLowerCase()) return false;
                       if(map.has(v.key.toLowerCase())===true){ //если ключ пустой пропускаем
                           console.log(` Файл локализации, обнаружено совпадение ключей ${v.key.toLowerCase()}  `);
                       }else{
                           map.set(v.key.toLowerCase(),v.value)
                       }
                       console.log(v.key.toLowerCase());
                   })
                }catch (ex){
                    console.log(` Ошибка Преобразования в json ${file}  ${error}`);
                }
            }
        });
}

let loc
/**
 * регистраия параметров транслятора
 * @def {sting} язык по умолчанию
 * @path {string} путь к файлу или директории с файлами json
 * @callback {function} функция обратного вызова, срабатывает после инициализаии словаря
 * @cookieName {string} названия куки
 */
exports.configLocale=function ({def,path,callback: callback,cookieName: cookieName}){
     loc = new Localise({def:def,path:path,callback:callback,cookieName: cookieName});
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

exports.getCore=function (key,lan){
    return loc.get(key,lan)
}
exports.cookieName=()=>{ return _cookieName;}



