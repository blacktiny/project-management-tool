import React, { Component } from 'react'
import { Redirect, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Task from './Task'
import './App.css'

import logo from '../logo.svg'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='app'>
          <div className='navbar'>
            <div className='logo-section'>
              <img src={logo} alt='logo' />
            </div>
            <div className='nav-item active'>Task</div>
            <div className='nav-item'>Member</div>
            <div className='nav-item'>Profile</div>
          </div>
          <div className='page-content'>
            <Route exact path='/' component={Home} />
            <Route path='/task/:userId' component={Task} />
            <Redirect from='/task' to='/task/all' />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
