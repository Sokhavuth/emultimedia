// controllers/dashboard/post.js
class Post{
  
  getDateTime(req, res){
    const today = new Date();
    const date = today.toLocaleDateString('fr-CA');
    const time = today.toLocaleTimeString('it-IT');
    res.json({date: date, time: time});
  }

  async postPost(req, res){
    const postdb = require('../../models/dashboard/postdb');
    
    const data = {};
    let post = false;

    try{
      if((req.body.id)){
        post = await postdb.updatePost(req);
        data.message = `Post with title «${post.name}» has been updated.`;
      }else{
        post = await postdb.postPost(req);
        data.message = `Post with title «${post.name}» has been created.`;
      }
      data.item = post;
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async getPost(req, res){
    const postdb = require('../../models/dashboard/postdb');
    const config = require('../../config');

    const data = {};
    let message = '';
    var posts = [];

    try{
      const amount = await postdb.countPost();

      if(req.query.page){
        posts = await postdb.getPosts(config.dashboardLimit, false, req.query.page);
        if(posts.length > 0){
          data.message = posts.length + ' more posts were added';
        }else{
          data.message = '0 post were added';
        }
      }else if(req.body.id){
        posts = await postdb.getPosts(config.dashboardLimit, req.body.id);
        data.message = `Post with title «${posts.name}» is beging edited.`
      }else{
        posts = await postdb.getPosts(config.dashboardLimit);
        if(amount === 1){
          message = amount + ' post was created.';
        }else{
          message = amount + ' posts were created.';
        }
        data.message = message;
      }

      data.itemsListing = posts;
      
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async deletePost(req, res){
    const postdb = require('../../models/dashboard/postdb');

    const data = {};

    try{
      const name = await postdb.deletePost(req);
      data.message = `Post «${name}» has been deleted.`;
      res.json(data);
    }catch(err){
      console.log(err);
    }

  }

}//end class

module.exports = new Post();