import React from 'react';
import './ditemslisting.scss';

import tool from '../../tool.js'

class Ditemslisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: '',
      message: false
    }
  }

  componentWillReceiveProps(props){
    this.getItemsListing();
  }
  
  getItemsListing = async () => {
    this.called = true;
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
            <a href onClick={()=>this.toFrontendItem('/edit/'+itemsListing[index].id)}><img alt='' src='/images/edit.png' /></a>
            <a href onClick={()=>this.toFrontendItem('/delete/'+itemsListing[index].id)}><img alt='' src='/images/delete.png' /></a>
          </div>
        </li>
        );
      }

      if(this.props.newItem){
        this.setState({message: this.props.newItem.message});
      }else{
        this.setState({message: result.message});
      }

      this.setState({listing: html});
    }
  }

  toFrontendItem = (id) => {
    alert(id)
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
          <img alt='' src='/images/load-more.png' />
        </li>
        </ul>
      </div>
    );
  }

}// end class

export default Ditemslisting;