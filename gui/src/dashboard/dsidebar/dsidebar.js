import React from 'react';
import './dsidebar.scss';
import {Link} from 'react-router-dom';

class DSidebar extends React.Component{

  render(){
    return(
      <div className="DSidebar">
        <div className='sidebar-wrapper'>
        <div className="menu-item">
          <Link to='/admin/post'><img alt="" src='/images/posting.png' /></Link>
          <Link to='/admin/post'>Post</Link>
        </div>

        <div className="menu-item">
          <Link to='/admin/page'><img alt="" src='/images/paging.png' /></Link>
          <Link to='/admin/page'>Page</Link>
        </div>

        <div className="menu-item">
          <Link to='/admin/category'><img alt="" src='/images/category.png' /></Link>
          <Link to='/admin/category'>Category</Link>
        </div>

        <div className="menu-item">
          <Link to='/admin/upload'><img alt="" src='/images/upload.png' /></Link>
          <Link to='/admin/upload'>Upload</Link>
        </div>

        <div className="menu-item">
          <Link to='/admin/author'><img alt="" src='/images/user.png' /></Link>
          <Link to='/admin/author'>Author</Link>
        </div>

        <div className="menu-item">
          <Link to='/admin/setting'><img alt="" src='/images/setting.png' /></Link>
          <Link to='/admin/setting'>Setting</Link>
        </div>
        </div>
      </div>
    );
  }
}

export default DSidebar