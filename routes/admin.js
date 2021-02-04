// routes/admin.js
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next){
  const login = require('../controllers/login');
  login.postLogin(req, res);
});

router.get('/logged', function(req, res, next){
  const login = require('../controllers/login');
  login.checkLogin(req, res);
});

router.get('/logout', function(req, res, next){
  const login = require('../controllers/login');
  login.logOut(req, res);
});

module.exports = router;
