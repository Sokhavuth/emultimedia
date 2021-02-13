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

      if(req.body.page){
        posts = await postdb.getPosts(config.dashboardLimit, false, req.body.page);
        if(posts.length > 0){
          data.message = config.dashboardLimit + ' more categories were added';
        }else{
          data.message = '0 categories were added';
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
/*
  async deleteCategory(req, res){
    const categorydb = require('../../models/dashboard/categorydb');

    const data = {};

    try{
      const name = await categorydb.deleteCategory(req);
      data.message = `Category «${name}» has been deleted.`;
      res.json(data);
    }catch(err){
      console.log(err);
    }

  }
*/
}//end class

module.exports = new Post();