import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

import userIcon from '../../assets/icons/user.png'

class UserNavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [
        {
          avatar: '',
          name: 'Anton',
          userId: 'anton'
        },
        {
          avatar: '',
          name: 'Xianru Xian',
          userId: 'xianru'
        },
        {
          avatar: '',
          name: 'Li YinYong',
          userId: 'yinyong'
        }
      ],
      current_user: 'all'
    }
  }

  onUserSelected = (user) => {
    this.setState({ current_user: user })
  }

  render() {
    const { users, current_user } = this.state
    let user_list = users.map((item, index) => {
      return (
        <div key={index} className={`user-navbar-item${current_user === item.name ? ' active' : ''}`} onClick={() => this.onUserSelected(item.name)}>
          <Link to={`/task/${item.userId}`}>
            <div className='user-avatar'>
              <img src={userIcon} alt='user' />
            </div>
            <div className='user-name'>{item.name}</div>
          </Link>
        </div>
      )
    })
    
    return (
      <div className='user-navbar'>
        <div className={`all-task${current_user === 'all' ? ' active' : ''}`} onClick={() => this.onUserSelected('all')}>
          <Link to='/task/all'>
            All Tasks
          </Link>
        </div>
        {user_list}
      </div>
    )
  }
}

export default UserNavbar
