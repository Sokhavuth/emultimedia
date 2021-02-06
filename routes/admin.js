// routes/admin.js
const e = require('express');
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

router.get('/category/api', function(req, res, next){
  if(req.session.user){
    const category = require('../controllers/category');
    category.getDateTime(req, res);
  }else{
    redirect('/login');
  }

});

module.exports = router;
