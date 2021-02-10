import React, { Component } from 'react';
import {Switch} from "react-router-dom";
import './App.css';

import adminRouter from './routes/amdinRouter';
import indexRouter from './routes/indexRouter';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Switch>
          {indexRouter}
          {adminRouter}
        </Switch>
      </div>
    );
  }
}

export default App;
