import React from 'react';
import './ditemslisting.scss';
import $ from 'jquery';

import tool from '../../tool.js'

class Ditemslisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: [],
      message: false,
      page: 0,
      pagination: false,
      newItem: false,
      deleteitem: false
    }

    this.getItemsListing();
  }

  componentWillReceiveProps(props){
    if(props.newItem || props.deleteitem){
      this.getItemsListing();
    }
  }
  
  getItemsListing = async () => {
    const result = await tool.fetchAPI(this.props.uri);
    this.listItems(result)
  }

  listItems = (result) => {
    const itemsListing = result.itemsListing;
    if(itemsListing){
      let html = [];
      let thumbUrl = '';

      for(let index in itemsListing){
        thumbUrl = tool.getThumbUrl(itemsListing[index].content);
        html.push(
        <li className="item">
          <div className="img-wrapper">
            <img onClick={()=>this.toFrontendItem(itemsListing[index].id)} alt="" src={thumbUrl} />
          </div>
          <div className='item-title'>
            <a href onClick={()=>this.toFrontendItem(itemsListing[index].id)}>{itemsListing[index].name}</a>
            <div>{new Date(itemsListing[index].date).toLocaleDateString('km-KH')}</div>
          </div>
          <div className='edit-delete'>
            <a href onClick={()=>this.props.editItem(itemsListing[index].id)}><img alt='' src='/images/edit.png' /></a>
            <a href onClick={()=>this.props.deleteItem(itemsListing[index].id)}><img alt='' src='/images/delete.png' /></a>
          </div>
        </li>
        );
      }

      let newHtml = '';
      
      if(this.state.pagination){
        this.setState({message: result.message});
        const listing = this.state.listing;
        newHtml = listing.concat(html);
        this.setState({pagination: false})
      }else if(this.props.deleteitem){
        this.setState({message: this.props.deleteitem, page: 0});
        newHtml = html;
      }else if(this.props.newItem){
        this.setState({
          message: this.props.newItem.message, 
          page: 0,
        });
        newHtml = html;
      }else{
        this.setState({message: result.message, page: 0});
        newHtml = html;
      }

      this.setState({listing: newHtml});
    }
  }

  toFrontendItem = (id) => {
    alert(id)
  }

  paginate = async () => {
    $('.load-more img').attr('src', '/images/loading.gif');
    let p = this.state.page;
    this.setState({page: ++p, pagination: true});

    const result = await tool.fetchAPI(this.props.uri+'?page='+p);
    this.listItems(result);
    $('.load-more img').attr('src', '/images/load-more.png');
  }

  render(){
    return(
      <div className='Ditemslisting'>
        <div className="message">Status: {this.state.message}</div>
        <ul>
          {this.state.listing}
        </ul>
        <ul>
        <li className="item load-more">
          <img alt='' onClick={this.paginate} src='/images/load-more.png' />
        </li>
        </ul>
      </div>
    );
  }

}// end class

export default Ditemslisting;