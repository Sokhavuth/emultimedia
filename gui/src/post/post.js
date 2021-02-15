import React from 'react';
import './post.scss';

import tool from '../tool';

class Post extends React.Component{
  constructor(){
    super();
    this.state = {
      posts: '',
      pagination: false,
    }

    this.getPost();
  }

  getPost = async () => {
    const result = await tool.fetchAPI('/api/post');
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
            <img  alt="" src={thumbUrl} />
          </div>
          <div className='item-title'>
            <a >{itemsListing[index].name}</a>
            <div>{new Date(itemsListing[index].date).toLocaleDateString('km-KH')}</div>
          </div>
          
        </li>
        );
      }

      let newHtml = '';
      
      if(this.state.pagination){
        const listing = this.state.listing;
        newHtml = listing.concat(html);
        this.setState({pagination: false})
      }else{
        newHtml = html;
      }

      this.setState({posts: newHtml});
    }
  }

  render(){
    return(
      <div className='Post region'>
        <div className='content'>
          <ul>
            {this.state.posts}
          </ul>
        </div>
        <div className='sidebar'></div>
      </div>
    );
  }
}

export default Post;