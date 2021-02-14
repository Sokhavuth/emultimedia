// routes/dashboard/post.js
var express = require('express');
var router = express.Router();

router.get('/apitime', function(req, res, next){
  if(req.session.user){
    const post = require('../../controllers/dashboard/post');
    post.getDateTime(req, res);
  }else{
    res.redirect('/');
  }
});

router.post('/api', function(req, res, next){
  if(req.session.user){
    const post = require('../../controllers/dashboard/post');
    post.postPost(req, res);
  }else
    res.redirect('/');
});

router.get('/api', function(req, res, next){
  if(req.session.user){
    const post = require('../../controllers/dashboard/post');
    post.getPost(req, res);
  }else
    res.redirect('/');
});

router.post('/edit/api', function(req, res, next){
  if(req.session.user){
    const post = require('../../controllers/dashboard/post');
    post.getPost(req, res);
    
  }else
    res.redirect('/');
});

router.post('/delete/api', function(req, res, next){
  if(req.session.user){
    const post = require('../../controllers/dashboard/post');
    post.deletePost(req, res);
  }else
    res.redirect('/');
});

module.exports = router;