import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import FirebaseIcon from 'mdi-react/FirebaseIcon'
// import Loading from '../Loading'
import LogInForm from './LogInForm'
// import GoogleAuthBtn from '../../../containers/Account/AuthBtn/googleAuthBtn'
// import FacebookAuthBtn from '../../../containers/Account/AuthBtn/fbAuthBtn'

import { authLogin } from '../../stores/Auth/actions'

class Login extends Component {
  onLogin = async (values) => {
    const { authLoginAction } = this.props

    authLoginAction({
      username: values.username,
      password: values.password
    })
  }

  render() {
    const { user } = this.props
    console.log('auth login = ', user.login)

    if (user.login) {
      return (<Redirect from='/log_in' to='/dashboard' />)
    }
    // const {
    //   loginWithRedirect, loading,
    // } = useAuth0()
    // if (loading) {
    //   return (<Loading loading={loading} />)
    // }
    return (
      <div className="account account--not-photo">
      <div className='account__wrapper'>
        <div className='account__card'>
          <div className='account__head'>
            <h3 className='account__title'>Welcome to
              <span className='account__logo'> Easy
                <span className='account__logo-accent'>DEV</span>
              </span>
            </h3>
            <h4 className='account__subhead subhead'>Start your business easily</h4>
          </div>
          <LogInForm
            onSubmit={this.onLogin}
          />
          <div className='account__or'>
            <p>Or Easily Using</p>
          </div>
          <div className='account__social'>
            {/* <FacebookAuthBtn />
            <GoogleAuthBtn /> */}
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const state = ({ user }) => ({
  user: user
})

const actions = ({
  authLoginAction: authLogin
})

export default connect(state, actions)(Login)
