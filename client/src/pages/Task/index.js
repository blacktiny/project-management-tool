import React, { Component } from 'react'
import UserNavbar from '../../components/userNavbar'
import './style.scss'

class Task extends Component {
  render() {
    return (
      <div className='task'>
        <UserNavbar />
        <div className='task-content'></div>
      </div>
    )
  }
}

export default Task
