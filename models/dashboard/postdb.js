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
/*
  async updateCategory(req){
    const category = await this.categories.findOne({id:req.body.id});
    category.id = req.body.id;
    category.name = req.body.categoryName;
    category.date = new Date(req.body.date +' ' + req.body.time);
    
    return await category.save();
  }

  async deleteCategory(req){
    const category = await this.categories.findOne({id:req.body.id});
    const name = category.name;
    await this.categories.deleteOne({id:req.body.id});
    return name;
  }
*/
}// end class

module.exports = new Postdb();