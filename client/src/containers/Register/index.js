import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { authRegister } from '../../stores/Auth/actions'

class Register extends PureComponent {
  state = {
    error: '',
  }

  onRegister = (values) => {
    const { authRegisterAction } = this.props

    authRegisterAction(values)
  }

  render() {
    const { error } = this.state
    return (
      <div className='account account--not-photo'>
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'>Welcome to
                <span className='account__logo'> Easy
                  <span className='account__logo-accent'>DEV</span>
                </span>
              </h3>
              <h4 className='account__subhead subhead'>Create an account</h4>
            </div>
            <RegisterForm onSubmit={this.onRegister} errorMessage={error} />
            <div className='account__have-account'>
              <p>Already have an account? <Link to='/log_in'>Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const state = ({ auth }) => ({
  auth: auth
})

const actions = () => ({
  authRegisterAction: authRegister
})

export default connect(state, actions)(Register)
