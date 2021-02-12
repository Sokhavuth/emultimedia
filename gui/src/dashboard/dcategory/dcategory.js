import React from 'react';
import './dcategory.scss';

import CKEditor from '../dckeditor/dckeditor.js';
import tool from '../../tool.js';
import Ditemslisting from '../ditemslisting/ditemslisting.js';

class DCategory extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: false, 
      time: false,
      categoryName: '',
      id: false,
      content: '',
      amount: '',
      newItem: false,
      deleteitem: false
    };

    this.getDateTime();
  }

  getDateTime = async () => {
    const result = await tool.fetchAPI('/admin/category/apiTime');
    this.setState({date: result.date, time: result.time});
  }

  getCKEditorContent = (editor) => {
    this.editor = editor;
    editor.change = false;
    editor.edit = false;
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    const uri = '/admin/category/api';
    this.editor.edit = true;
    const data = {
      date: this.state.date,
      time: this.state.time,
      categoryName: this.state.categoryName,
      content: this.editor.getData(),
      id: this.state.id,
    }

    const result = await tool.fetchPostAPI(uri, data);
    this.getDateTime();
    this.setState({
      newItem: result, 
      categoryName: '',
      deleteitem: false,
      id: false
    });
    this.editor.setData('');
    this.editor.submit = false;
    this.editor.change = false;
  }

  editItem = async (id) => {
    const result = await tool.fetchPostAPI('/admin/category/edit/api', {id: id});
    this.editor.setData(result.itemsListing.content);
    this.setState({
      id: result.itemsListing.id,
      date: new Date(result.itemsListing.date).toLocaleDateString('fr-CA'),
      time: new Date(result.itemsListing.date).toLocaleTimeString('it-IT'),
      content: result.itemsListing.content,
      categoryName: result.itemsListing.name,
    });
    
  }

  deleteItem = async (id) => {
    const result = await tool.fetchPostAPI('/admin/category/delete/api', {id: id});
    this.getDateTime();
    this.setState({
      categoryName: '',
      deleteitem: result.message,
      newItem: false
    });
  }

  render(){
    return(
      <div className="DCategory">
        <CKEditor getContent = {this.getCKEditorContent} />
        <form className='category-form' onSubmit={this.onSubmitHandler} >
          <input id="submit" type='submit' value='Submit' />
          <input type='text' onChange={this.onChangeHandler} value={this.state.categoryName} name='categoryName' placeholder='category name' required='required' />
          <input type='date' onChange={this.onChangeHandler} value={this.state.date} name='date' required='required' />
          <input type='time' onChange={this.onChangeHandler} value={this.state.time} name='time' required='required' />
        </form>
        
        <Ditemslisting  
          uri='/admin/category/api' 
          newItem={this.state.newItem} 
          deleteitem={this.state.deleteitem}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
        />

      </div>
    );
  }

}

export default DCategory;