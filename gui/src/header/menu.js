import React from 'react';
import {Link} from "react-router-dom";

class Menu extends React.Component{
  
  mobileMenu = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  render(){
    return(
      <div className="main-menu-outer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <nav className='main-menu region'>
          <div className="topnav" id="myTopnav">
            <Link id="house" to="/" className="active"><img alt="" src="/images/house.png" /></Link>
            <Link to="/news">News</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to='/login'>Login</Link>
            <Link onClick={this.mobileMenu} className="icon" ><i className="fa fa-bars"></i></Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
