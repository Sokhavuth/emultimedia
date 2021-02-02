var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get('/api', function(req, res, next){
  const config = require('../config');
  res.json(config);
});

module.exports = router;
