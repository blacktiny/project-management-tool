import actionTypes from '../../constants/actionTypes'
import { api } from '../api'

// export const getTasksByUserId = (userId) => (
//   {
//     type: actionTypes.GET_TASKS,
//     data: { userId }
//   }
// )
export const getTasks = () => api(
  {
    type: actionTypes.GET_TASKS,
    data: {}
  }
)

export const addNewTask = (newTask) => api(
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
