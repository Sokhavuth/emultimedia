// controllers/login.js
class Login{
  constructor(){
    this.deepcopy = require('deepcopy');
    this.vdict = require('../config');
    this.usersdb = require('../models/usersdb');
    this.bcrypt = require('bcryptjs');
  }

  postLogin(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    delete data.databaseAccess;

    this.usersdb.checkUser(req, function(user){
      if(user){
        if(self.bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          data.success = true;
          res.json(data);
        }else{
          data.message = 'The password is wrong.';
          data.success = false;
          res.json(data);
        }
      }else{
        data.message = 'The email is wrong.';
        data.success = false;
        res.json(data);
      }
    });
  }

  checkLogin(req, res){
    if(req.session.user){
      res.json({logged: true});
    }else{
      res.json({logged: false});
    }
  }

  logOut(req, res){
    if(req.session.user){
      req.session.destroy(function (err) {
        if(err)
          res.json({success: false});
        else
          res.json({success: true});
      });  
    }
  }

}//end class

module.exports = new Login();