// controllers/post.js
class Post {
  constructor(){
    this.postdb = require('../models/postdb');
    this.config = require('../config');
  }

 async getPost(req, res){
    const posts = await this.postdb.getPost();
    res.json({itemsListing: posts});
  }
}

module.exports = new Post();