/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import allReducers from './reducers/index.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App'
import {createStore} from 'redux'
import Cart from './components/Cart'
import PizzaList from './components/PizzaList'

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true}));

if(document.getElementById('app')){
  ReactDOM.render(
    <Provider store={store}>
        <Router >
          <App />
          <Switch>
            <Route path="/" exact component={PizzaList}></Route>
            <Route path="/cart"  component={Cart}></Route>
          </Switch>
        </Router>
    </Provider>,
    document.getElementById('app')
  )
}
