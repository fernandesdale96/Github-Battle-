import React, { Component } from 'react';
import './App.css';
import Popular from './popular.js';
import classNames from 'classnames';
import Nav from './nav.js';
import Home from './home.js'
import Battle from './battle.js'
import Result from './result.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classNames('d-flex flex-column', 'container')}>
          <Nav />
          <Switch>
            <Route exact path='/battle' component={Battle} />
            <Route exact path='/' component={Home} />
            <Route exact path='/battle/results' component={Result} />
            <Route path="/popular" component={Popular} />
            <Route render={() => {
              return(
                <h1>404: Not Found </h1>
              )
            }
          } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
