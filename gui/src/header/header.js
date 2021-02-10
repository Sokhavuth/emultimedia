import React from 'react';
import './header.scss';
import tool from '../tool';
import utility from './headerjs';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
    
  async componentDidMount(){
    this.setState(await tool.fetchAPI('/api'));
    document.title = this.state.siteTitle;
    utility.clock();
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    document.getElementById('date').innerHTML = (new Date()).toLocaleDateString('en-US', options);
  }

  render(){
    return(
      <div className="header">
        <section id="header">
          <div className="top-menu-outer">
            <div className="top-menu region"><span id="date"></span><span id="kh-clock" className="time">time</span></div>
          </div>
          <div className="title-outer">
            <h1 className="site-title region">
              <span><a href="/" >{this.state.siteTitle}</a></span>
              <img className="news" alt="" src={'/images/newspaper.png'} />
              <span><img alt="" className="tvlive" src={'/images/livetv.png'}/></span>
            </h1>
          </div>
        </section>
        
      </div>
    );
  }
}

export default Header;
