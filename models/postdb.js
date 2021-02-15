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

  async getPost(amount=5, id=false, page=0){
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

}// end class

module.exports = new Postdb();