import actionTypes from '../../constants/actionTypes'
import { createProducer } from '../reducers/utilities'

let initialState = {
  login: false,
  user: {
    id: 'lightFury',
    name: 'YinYong',
    avatar: '',
    role: 'developer'
  }
}

export default createProducer(initialState, {

  [actionTypes.AUTH_LOGIN]: (auth, { data }) => {
    auth.login = true
  }
})
