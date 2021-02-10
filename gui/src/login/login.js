import React from 'react';
import './login.scss';
import {Redirect} from 'react-router-dom';

import tool from '../tool.js';
import utility from '../header/headerjs';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: '',
      email: '',
      password: '',
      siteTitle: 'Dashboard',
      redirect: false
    };
    this.checkLogin();
  }

  checkLogin = async () => {
    const result = await tool.checkLogin();
    if(result){
      clearTimeout(utility.t);
      this.setState({
        redirect: '/admin'
      })
    }
  }

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  onSubmitHandler = async (event) => {
    event.preventDefault();
    const option = {
      email: this.state.email,
      password: this.state.password
    }
    const result = await tool.fetchPostAPI('/admin/login', option);
    if(result.success){
      clearTimeout(utility.t);
      this.setState({
        message: result.message,
        siteTitle: result.siteTitle,
        redirect: '/admin'
      });
    }else{
      this.setState({
        message: result.message
      });
    }
  }

  render(){
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <div className='Login region'>
        <form id="login" action="/admin/login" method="post" onSubmit={this.onSubmitHandler}>
          <span>Email:</span><input onChange={this.onChangeHandler} type="email" name="email" required />
          <span>Password:</span><input onChange={this.onChangeHandler} type="password" name="password" required />
          <span></span><input type="submit"  />
        </form>
        <div className="message"> {this.state.message} </div>
      </div>
    );
  }
}

export default Login;