import actionTypes from '../../constants/actionTypes'
import { createProducer } from '../reducers/utilities'

let initialState = {
  login: false,
  loading: false,
  action: '',
  error: '',
  user: {
    id: 'lightFury',
    name: 'YinYong',
    avatar: '',
    role: 'developer'
  }
}

export default createProducer(initialState, {

  [actionTypes.AUTH_LOGIN_START]: (auth, { data }) => {
    auth.loading = true
    auth.action = 'login'
  },

  [actionTypes.AUTH_LOGIN_SUCCESS]: (auth, { data }) => {
    const { user, error } = data
    auth.loading = false
    auth.user = user
    auth.error = error
    if (!error) auth.login = true
  },

  [actionTypes.AUTH_REGISTER_START]: (auth, { data }) => {
    auth.loading = true
    auth.action = 'register'
  },

  [actionTypes.AUTH_REGISTER_SUCCESS]: (auth, { data }) => {
    const { user, error } = data
    auth.loading = false
    auth.error = error
  }
})
