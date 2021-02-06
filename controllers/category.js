// controllers/category.js
class Category{
  
  getDateTime(req, res){
    const today = new Date();
    const date = today.toLocaleDateString('fr-CA');
    const time = today.toLocaleTimeString('it-IT');
    res.json({date: date, time: time});
  }

}//end class

module.exports = new Category();