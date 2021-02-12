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
    let category = false;

    try{
      if((req.body.id)){
        category = await categorydb.updateCategory(req);
        data.message = `Category «${category.name}» has been updated.`;
      }else{
        category = await categorydb.postCategory(req);
        data.message = `Category «${category.name}» has been created.`;
      }
      data.item = category;
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
    var categories = [];

    try{
      const amount = await categorydb.countCategory();

      if(req.body.page){
        categories = await categorydb.getCategories(config.dashboardLimit, false, req.body.page);
        if(categories.length > 0){
          data.message = config.dashboardLimit + ' more categories were added';
        }else{
          data.message = '0 categories were added';
        }
      }else if(req.body.id){
        categories = await categorydb.getCategories(config.dashboardLimit, req.body.id);
        data.message = `Category «${categories.name}» is beging edited.`
      }else{
        categories = await categorydb.getCategories(config.dashboardLimit);
        if(amount === 1){
          message = amount + ' category was created.';
        }else{
          message = amount + ' categories were created.';
        }
        data.message = message;
        console.log(data.message)
      }

      data.itemsListing = categories;
      
      res.json(data);
    }catch(err){
      console.log(err);
    }
  }

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

}//end class

module.exports = new Category();