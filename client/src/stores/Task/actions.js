import actionTypes from '../../constants/actionTypes'

export const addNewTask = (newTask) => (
  {
    type: actionTypes.ADD_NEW_TASK,
    data: newTask
  }
)

export const startTimer = (index, key, value) => (
  {
    type: actionTypes.START_TIMER,
    index,
    key,
    value
  }
)
