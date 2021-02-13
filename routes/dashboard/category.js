// routes/dashboard/category.js
var express = require('express');
var router = express.Router();

router.get('/apiTime', function(req, res, next){
  if(req.session.user){
    const category = require('../../controllers/dashboard/category');
    category.getDateTime(req, res);
  }else{
    res.redirect('/');
  }
});

router.post('/api', function(req, res, next){
  if(req.session.user.role === 'Admin'){
    const category = require('../../controllers/dashboard/category');
    category.postCategory(req, res);
  }else
    res.redirect('/');
});

router.get('/api', function(req, res, next){
  if(req.session.user){
    const category = require('../../controllers/dashboard/category');
    category.getCategories(req, res);
  }else
    res.redirect('/');
});

router.post('/page/api', function(req, res, next){
  if(req.session.user){
    const category = require('../../controllers/dashboard/category');
    category.getCategories(req, res);
  }else
    res.redirect('/');
});

router.post('/edit/api', function(req, res, next){
  if(req.session.user.role === "Admin"){
    const category = require('../../controllers/dashboard/category');
    category.getCategories(req, res);
    
  }else
    res.redirect('/');
});

router.post('/delete/api', function(req, res, next){
  if(req.session.user.role === "Admin"){
    const category = require('../../controllers/dashboard/category');
    category.deleteCategory(req, res);
  }else
    res.redirect('/');
});

module.exports = router;