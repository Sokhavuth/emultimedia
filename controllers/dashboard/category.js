// controllers/dashboard/category.js
class Category{
  
  getDateTime(req, res){
    const today = new Date();
    const date = today.toLocaleDateString('fr-CA');
    const time = today.toLocaleTimeString('it-IT');
    res.json({date: date, time: time});
  }

  async postCategory(req, res){
    const categorydb = require('../../models/dashboard/categorydb');

    const data = {};

    try{
      const category = await categorydb.postCategory(req);
      data.item = category;
      data.message = `Category ${category.name} has been created.`;
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

  async getCategories(req, res){
    const categorydb = require('../../models/dashboard/categorydb');
    const config = require('../../config');

    const data = {};
    let message = '';

    try{
      const categories = await categorydb.getCategories(config.dashboardLimit);
      const amount = await categorydb.countCategory();
      data.itemsListing = categories;
      if(amount === 1){
        message = amount + ' category was created.';
      }else{
        message = amount + ' categories were created.';
      }
      data.message = message;
      res.json(data);
    }catch(err){
     console.log(err);
    }
  }

}//end class

module.exports = new Category();