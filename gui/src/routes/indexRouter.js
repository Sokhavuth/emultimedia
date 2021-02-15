import {Route} from "react-router-dom";

import Menu from '../header/menu.js';
import Header from '../header/header.js';
import Footer from '../footer/footer.js'
import Channel from '../channel/channel.js';
import Login from '../login/login.js';
import Post from '../post/post.js';

const indexRouter = [
  <Route exact path="/">
    <Header />
    <Menu />
    <Channel />
    <Post />
    <Footer />
  </Route>,
  <Route exact path="/news">
    <Header />
    <Menu />
    <h1>News</h1>
    <Footer />
  </Route>,
  <Route exact path="/contact">
    <Header />
    <Menu />
    <h1>Contact</h1>
    <Footer />   
  </Route>,
  <Route exact path="/about">
    <Header />
    <Menu />
    <h1>About</h1>
    <Footer />
  </Route>,
  <Route exact path="/login">  
    <Header />
    <Menu />
    <Login />
    <Footer />
  </Route>
];

export default indexRouter;