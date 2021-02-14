// models/postdb.js
class Postdb{
  constructor(){
    const mongoose = require('mongoose');
    const postSchema = new mongoose.Schema({
      id: {type: String, required: true},
      name: {type: String, required: true},
      content: {type: String, required: false},
      category: {type: Array, required: false},
      date: {type: Date, required: true}
    });

    this.post = mongoose.model('posts', postSchema);
  }

  async postPost(req){
    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    const date = new Date(req.body.date +' ' + req.body.time);
    const labels = (req.body.category).split(',');
    labels.pop()
    const post = new (this.post)({id: id, name: req.body.title, content: req.body.content, category: labels, date: date});
    return await post.save();
  }

  async getPosts(amount=5, id=false, page=0){
    if(id){
      return await this.post.findOne({id: id});
    }else if(page){
      return await this.post.find().skip(amount * page).sort({date: -1, _id: -1}).limit(amount);
    }else{
      return await this.post.find().sort({date: -1, _id: -1}).limit(amount);
    }
  }

  async countPost(){
    return await this.post.countDocuments({});
  }

  async updatePost(req){
    const post = await this.post.findOne({id:req.body.id});
    post.id = req.body.id;
    post.name = req.body.title;
    post.date = new Date(req.body.date +' ' + req.body.time);
    post.category = req.body.category;
    
    return await post.save();
  }

  async deletePost(req){
    const post = await this.post.findOne({id:req.body.id});
    const name = post.name;
    await this.post.deleteOne({id:req.body.id});
    return name;
  }

}// end class

module.exports = new Postdb();