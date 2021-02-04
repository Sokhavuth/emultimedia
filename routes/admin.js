// routes/admin.js
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const login = require('../controllers/login');
  login.postLogin(req, res);
});

module.exports = router;
