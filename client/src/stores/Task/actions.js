import actionTypes from '../../constants/actionTypes'
import { api } from '../api'

export const getTasksByUserId = (userId) => (
  {
    type: actionTypes.GET_TASKS,
    data: { userId }
  }
)
// export const getTasksByUserId = (userId) => api(
//   {
//     url: '/task/load',
//     data: { userId }
//   }
// )

export const addNewTask = (newTask) => (
  {
    type: actionTypes.ADD_NEW_TASK,
    data: { newTask }
  }
)

export const deleteTask = (taskId) => (
  {
    type: actionTypes.DELETE_TASK,
    data: { taskId }
  }
)

export const updateTaskStatus = (index, key, value) => (
  {
    type: actionTypes.START_TIMER,
    data: {
      index,
      key,
      value
    }
  }
)
