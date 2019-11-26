import React, { Component } from 'react'
import { Redirect, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../stores/store'
import Router from './Router'
import Task from '../Task'
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss'

import logo from '../../logo.svg'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <div className='app'>
            <div className='navbar'>
              <div className='logo-section'>
                <img src={logo} alt='logo' />
              </div>
              <div className='nav-item active'>Task</div>
              <div className='nav-item'>Member</div>
              <div className='nav-item'>Profile</div>
            </div>
            <div className='page-content'>
              <Route path='/task/:userId' component={Task} />
              <Redirect from='/task' to='/task/all' />
            </div>
          </div> */}
          <Router />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
