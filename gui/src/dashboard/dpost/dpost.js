import React from 'react';
import './dpost.scss';
import $ from 'jquery';

import CKEditor from '../dckeditor/dckeditor.js';
import tool from '../../tool.js';
import Ditemslisting from '../ditemslisting/ditemslisting.js';

class DPost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: false, 
      time: false,
      category: '',
      categories: '',
      postTitle: '',
      id: false,
      content: '',
      amount: '',
      newItem: false,
      deleteitem: false
    };

    this.getDateTime();
    this.getCategories();
  }

  getCKEditorContent = (editor) => {
    this.editor = editor;
    editor.change = false;
    editor.edit = false;
  }

  getDateTime = async () => {
    const result = await tool.fetchAPI('/admin/post/apitime');
    this.setState({date: result.date, time: result.time});
  }

  getCategories = async () => {
    const result = await tool.fetchAPI('/admin/category/api?amount=all');
    var categories = [<option>Select category from here</option>];
    for(let index in result.itemsListing){
      categories.push(<option>{result.itemsListing[index].name}</option>);
    }

    this.setState({categories: categories});
  }

  setCategory = () => {
    let cat = $('#selectCategory').val();
    cat = this.state.category + cat + ', ';
    this.setState({category: cat});
    $("#selectCategory").prop('selectedIndex', 0);
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    const uri = '/admin/post/api';
    this.editor.edit = true;
    const data = {
      title: this.state.postTitle,
      date: this.state.date,
      time: this.state.time,
      category: this.state.category,
      content: this.editor.getData(),
      id: this.state.id,
    }

    const result = await tool.fetchPostAPI(uri, data);
    this.getDateTime();
    this.setState({
      newItem: result, 
      category: '',
      postTitle: '',
      deleteitem: false,
      id: false
    });
    this.editor.setData('');
    this.editor.submit = false;
    this.editor.change = false;
  }

  editItem = async (id) => {
    const result = await tool.fetchPostAPI('/admin/post/edit/api', {id: id});
    this.editor.setData(result.itemsListing.content);
    this.setState({
      id: result.itemsListing.id,
      date: new Date(result.itemsListing.date).toLocaleDateString('fr-CA'),
      time: new Date(result.itemsListing.date).toLocaleTimeString('it-IT'),
      content: result.itemsListing.content,
      postTitle: result.itemsListing.name,
      category: (result.itemsListing.category).toString()
    });
    
  }

  deleteItem = async (id) => {
    const result = await tool.fetchPostAPI('/admin/post/delete/api', {id: id});
    this.getDateTime();
    this.setState({
      postTitle: '',
      deleteitem: result.message,
      category: '',
      newItem: false
    });
  }

  render(){
    return(
      <div className="DPost">
        <CKEditor getContent = {this.getCKEditorContent} />
        <form className='post-form' onSubmit={this.onSubmitHandler} >
          <input type='text' onChange={this.onChangeHandler} value={this.state.postTitle} name='postTitle' placeholder='post title' />
          <input type='text' onChange={this.onChangeHandler} value={this.state.category} name="category" placeholder='post category' />
          <input id="submit" type='submit' value='Submit' />
          <input type='date' onChange={this.onChangeHandler} value={this.state.date} name='date' required='required' />
          <input type='time' onChange={this.onChangeHandler} value={this.state.time} name='time' required='required' />
          <select id='selectCategory' onChange={this.setCategory} >
          {this.state.categories}
          </select>  
        </form>
        
        <Ditemslisting  
          uri='/admin/post/api' 
          newItem={this.state.newItem} 
          deleteitem={this.state.deleteitem}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
        />

      </div>
    );
  }

}

export default DPost;