import actionTypes from '../../constants/actionTypes'
import { api } from '../api'

export const authLogin = (data) => (
  {
    type: actionTypes.AUTH_LOGIN,
    data
  }
)

export const authRegister = (data) => (
  {
    type: actionTypes.AUTH_REGISTER,
    data
  }
)
