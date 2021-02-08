// models/categorydb.js
class Categorydb{
  constructor(){
    const mongoose = require('mongoose');
    const categorySchema = new mongoose.Schema({
      id: {type: String, required: true},
      name: {type: String, required: true},
      content: {type: String, required: false},
      date: {type: Date, required: true}
    });

    this.categories = mongoose.model('categories', categorySchema);
  }

  async postCategory(req){
    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    const date = new Date(req.body.date +' ' + req.body.time);
    const category = new (this.categories)({id: id, name: req.body.categoryName, content: req.body.content, date: date});
    return await category.save();
  }

  async getCategories(amount=5, id=false, page=0){
    if(id){
      return await this.categories.findOne({id: id});
    }else if(page){
      return await this.categories.find().skip(amount * page).sort({date: -1, _id: -1}).limit(amount);
    }else{
      return await this.categories.find().sort({date: -1, _id: -1}).limit(amount);
    }
  }

  async countCategory(){
    return await this.categories.countDocuments({});
  }

}// end class

module.exports = new Categorydb();