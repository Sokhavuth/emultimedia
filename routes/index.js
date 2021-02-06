var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(__basedir+'/gui/build/index.html');
});

router.get('/api', function(req, res, next){
  const config = require('../config');
  delete config.databaseAccess;
  res.json(config);
});

module.exports = router;
