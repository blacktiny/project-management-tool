import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import './App.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App