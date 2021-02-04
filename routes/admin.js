var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  
  res.json(data);
});

module.exports = router;
