import React, { Component } from 'react'
import './style.scss'

import userIcon from '../../assets/icons/user.png'

class UserNavbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [
        {
          avatar: '',
          name: 'Anton'
        },
        {
          avatar: '',
          name: 'Xianru Xian'
        },
        {
          avatar: '',
          name: 'Li YinYong'
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
          <div className='user-avatar'>
            <img src={userIcon} alt='user' />
          </div>
          <div className='user-name'>{item.name}</div>
        </div>
      )
    })
    
    return (
      <div className='user-navbar'>
        <div className={`all-task${current_user === 'all' ? ' active' : ''}`} onClick={() => this.onUserSelected('all')}>All Tasks</div>
        {user_list}
      </div>
    )
  }
}

export default UserNavbar
