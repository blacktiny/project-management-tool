import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Topbar from './topbar'
import Sidebar from './sidebar'
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../stores/Sidebar/actions'
// import { changeThemeToDark } from '../../redux/actions/themeActions'

class Layout extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  changeSidebarVisibility = () => {
    const { changeSidebarVisibility } = this.props
    changeSidebarVisibility()
  }

  changeMobileSidebarVisibility = () => {
    const { changeMobileSidebarVisibility } = this.props
    changeMobileSidebarVisibility()
  }

  // changeToDark = () => {
  //   const { dispatch } = this.props
  //   dispatch(changeThemeToDark())
  // }

  render() {
    const { sidebar/*, user*/ } = this.props
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
    })

    return (
      <div className={layoutClass}>
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
          // user={user}
        />
        <Sidebar
          sidebar={sidebar}
          // changeToDark={this.changeToDark}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    )
  }
}

const state = ({ sidebar, theme }) => ({
  sidebar: sidebar,
  theme: theme
})

const actions = ({
  changeMobileSidebarVisibility: changeMobileSidebarVisibility,
  changeSidebarVisibility: changeSidebarVisibility
})

export default connect(state, actions)(Layout)
