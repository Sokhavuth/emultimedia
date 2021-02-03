var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(__basedir+'/react/backend/build/index.html');
});

module.exports = router;
