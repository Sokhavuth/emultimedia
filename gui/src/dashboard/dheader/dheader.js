import React from 'react';
import {Redirect} from 'react-router-dom';
import './dheader.scss';
import tool from '../../tool';

class DHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dTitle: 'Dashboard',
      redirect: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.dTitle)
      return {dTitle: props.dTitle}
  }

  logOut = async (uri) => {
    const result = await tool.fetchAPI(uri);
    if(result.success){
      this.setState({
        redirect: '/'
      })
    }
  }

  render(){
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <div className="DHeader ">
        <section id="header ">
          <div id="header-outer">
            <div className="header-inner region">
              <h1>{this.state.dTitle}</h1>
              <form id="search" action="/admin/search" method='post'>
                <select id="search-label" name="fsearch-label">
                  <option>Post</option>
                  <option>Page</option>
                  <option>Author</option>
                </select>
                <input type="text" name="querry" placeholder="Search" />
                <input type="submit" />
              </form>
              <div id="logout"><a href onClick={()=>this.logOut('/admin/logout')}>Logout</a></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DHeader;