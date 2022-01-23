"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function is_server() {
  return !(typeof window != 'undefined' && window.document);
}

var _cookiesName;

var Localise = /*#__PURE__*/function () {
  function Localise(_ref) {
    var def = _ref.def,
        path = _ref.path,
        callback = _ref.callback,
        cookiesName = _ref.cookiesName;

    _classCallCheck(this, Localise);

    this._def = def;
    this._callback = callback;
    _cookiesName = cookiesName;
    this._path = path; // папка или файл с локализованным json

    this.map = new Map(); // словарь трансляции

    this.init();
  }

  _createClass(Localise, [{
    key: "get",
    value: function get(key, lang) {
      try {
        var keyCore = key.toLowerCase();

        if (this.map.has(keyCore)) {
          // если ключ есть в словаре
          var v = this.map.get(keyCore)[lang]; //значение по запросу

          var vd = this.map.get(keyCore)[this._def]; // значение по умолчанию


          if (v === undefined) {
            //значение по запросу отсутствует
            if (vd === undefined) {
              // дефолтное значение отсутствует
              return key;
            } else {
              return vd;
            }
          } else {
            // ключа нет в словаре
            return v;
          }
        } else {
          return key;
        }
      } catch (ex) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0438\u0441\u043A\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438: ".concat(ex));
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      if (this._path === undefined) {
        console.error("Путь к директории или файлу локализации не обозначен");
      }

      if (is_server() === true) {
        try {
          var Path = require("path");

          var fs = require("fs");

          var pp = this._path;
          var m = this.map;
          fs.stat(this._path, function (err, stats) {
            if (err) {
              console.error(err);
              return;
            }

            if (stats.isFile() === true) {
              // если файл
              builderMap(fs, pp, m);
            }

            if (stats.isDirectory()) {
              // если директроия, читаем все файлы из директроии  заносим их в словарь
              fs.readdir(_this._path, function (err, files) {
                if (err) {
                  return console.log('Ошибка чтения списка файлов из директории: ' + err);
                } else {
                  files.forEach(function (file) {
                    builderMap(fs, Path.join(pp, file), m);
                  });
                }
              });
            }
          });
        } catch (exception) {
          console.error("Init server localise error: ".concat(exception.trace));
        }
      } else {
        myFetchLocale(this._path).then(function (value) {
          Array.from(value).map(function (v) {
            if (!v.key.toLowerCase()) return false;

            if (_this.map.has(v.key.toLowerCase()) === true) {
              //если ключ пустой пропускаем
              console.log(" \u0424\u0430\u0439\u043B \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438, \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u043A\u043B\u044E\u0447\u0435\u0439 ".concat(v.key.toLowerCase(), "  "));
            } else {
              _this.map.set(v.key.toLowerCase(), v.value);
            }

            console.log(v.key.toLowerCase());
          });
          console.log("map  ", _this.map);
        }).catch(function (error) {
          console.error(error);
        }).finally(function () {
          if (_this._callback) {
            _this._callback();
          }
        });
      }
    }
  }]);

  return Localise;
}();

function myFetchLocale(_x) {
  return _myFetchLocale.apply(this, arguments);
}

function _myFetchLocale() {
  _myFetchLocale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
    var response, body;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(path);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            body = _context.sent;

            if (!(response.status !== 200)) {
              _context.next = 8;
              break;
            }

            throw "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0435 ".concat(body.message);

          case 8:
            console.log(body);
            return _context.abrupt("return", body);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _myFetchLocale.apply(this, arguments);
}

function builderMap(fs, file, map) {
  fs.readFile(file, "utf8", function (error, data) {
    if (error) {
      console.log(" \u041E\u0448\u0438\u0431\u043A\u0430 \u0410\u0441\u0438\u043D\u0445\u0440\u043E\u043D\u043D\u043E\u0435 \u0447\u0442\u0435\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u0430 ".concat(data, "  ").concat(error));
    } else {
      try {
        var f = JSON.parse(data);
        Array.from(f).map(function (v) {
          if (!v.key.toLowerCase()) return false;

          if (map.has(v.key.toLowerCase()) === true) {
            //если ключ пустой пропускаем
            console.log(" \u0424\u0430\u0439\u043B \u043B\u043E\u043A\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438, \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u043A\u043B\u044E\u0447\u0435\u0439 ".concat(v.key.toLowerCase(), "  "));
          } else {
            map.set(v.key.toLowerCase(), v.value);
          }

          console.log(v.key.toLowerCase());
        });
      } catch (ex) {
        console.log(" \u041E\u0448\u0438\u0431\u043A\u0430 \u041F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0432 json ".concat(file, "  ").concat(error));
      }
    }
  });
}

var loc;
/**
 * регистраия параметров транслятора
 * @def {sting} язык по умолчанию
 * @path {string} путь к файлу или директории с файлами json
 * @callback {function} функция обратного вызова, срабатывает после инициализаии словаря
 * @cookiesName {string} названия куки
 */

exports.configLocale = function (_ref2) {
  var def = _ref2.def,
      path = _ref2.path,
      callback = _ref2.callback,
      cookiesName = _ref2.cookiesName;
  loc = new Localise({
    def: def,
    path: path,
    callback: callback,
    cookiesName: cookiesName
  });
};
/**
 *
 * @key {string} ключ для перевода
 * @lan {string} язык перевода, при отсутствии - язык по умолчанию
 * @returns {string}
 */


exports.get = function (key, lan) {
  return loc.get(key, lan);
};

exports.cookiesName = function () {
  return _cookiesName;
};