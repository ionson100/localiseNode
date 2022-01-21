var express = require('express');
var router = express.Router();
var lan=require("../client/src/localise/index")
//
/* GET home page. */
router.get('/', function(req, res, next) {
  const locale = req.headers["accept-language"];
  var lang = req.acceptsLanguages('fr', 'es', 'en',"ru");
  res.render('index', { title: lan.get("Просто",lang) });
});

module.exports = router;
