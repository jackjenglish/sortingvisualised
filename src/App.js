import React, { Component } from 'react';
import './css/App.css';
import {Switch,Route} from 'react-router-dom';
import Algorithms from './Algorithms.js';
var classNames = require('classnames');
class App extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="App">
        <header>
          Sorting Visualised
        </header>
        <Switch>
          <Route path="/" component={Algorithms}/>
        </Switch>
      </div>
    );
  }
}

export default App;
