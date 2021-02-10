import React from 'react';
import './dcategory.scss';
import $ from 'jquery';

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
      content: '',
      amount: '',
      newItem: false
    };

    this.getDateTime();
  }

  getDateTime = async () => {
    const result = await tool.fetchAPI('/admin/category/apiTime');
    this.setState({date: result.date, time: result.time});
  }

  getCKEditorContent = (editor) => {
    $('#submit').on('click', () => {
      const editorData = editor.getData();
      this.setState({content: editorData});
      editor.setData('');
    });
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    const uri = '/admin/category/api';
    const data = {
      date: this.state.date,
      time: this.state.time,
      categoryName: this.state.categoryName,
      content: this.state.content
    }

    const result = await tool.fetchPostAPI(uri, data);
    this.getDateTime();
    this.setState({newItem: result});
    $('input[name="categoryName"').val('');
  }

  render(){
    return(
      <div className="DCategory">
        <CKEditor getContent = {this.getCKEditorContent} />
        <form className='category-form' onSubmit={this.onSubmitHandler} >
          <input id="submit" type='submit' value='Submit' />
          <input type='text' onChange={this.onChangeHandler} name='categoryName' placeholder='category name' required='required' />
          <input type='date' onChange={this.onChangeHandler} value={this.state.date} name='date' required='required' />
          <input type='time' onChange={this.onChangeHandler} value={this.state.time} name='time' required='required' />
        </form>
        
        <Ditemslisting  uri='/admin/category/api' newItem={this.state.newItem} />

      </div>
    );
  }

}

export default DCategory;