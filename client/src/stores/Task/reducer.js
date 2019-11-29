import actionTypes from '../../constants/actionTypes'
import { createProducer } from '../reducers/utilities'

let initialState = {
  loading: false,
  action: '',
  data: []
}

export default createProducer(initialState, {
  [actionTypes.GET_TASKS_START]: (task, { data }) => {
    task.loading = true
    task.action = 'get'
  },

  [actionTypes.GET_TASKS_SUCCESS]: (task, { data }) => {
    const { tasks } = data

    task.loading = false
    task.data = tasks
  },

  [actionTypes.ADD_NEW_TASK_START]: (task, { data }) => {
    task.loading = true
    task.action = 'add'
  },

  [actionTypes.ADD_NEW_TASK_SUCCESS]: (task, { data }) => {
    const { tasks } = data

    task.loading = false
    task.data = tasks
  },

  [actionTypes.ADD_NEW_TASK]: (task, { data }) => {
    task.data.push(data.newTask)
  },

  [actionTypes.DELETE_TASK]: (task, { data }) => {
    const { taskId } = data
    const index = task.data.findIndex(item => { return item.id === taskId })
    task.data.splice(index, 1)
  },

  [actionTypes.START_TIMER]: (task, { data }) => {
    const { index, key, value } = data
    task.data[index][key] = value
    
    if (key === 'isFinished') {
      task.data[index].inProgress = false
      task.data[index].startTime = task.data[index].endTime
    } else if (key === 'isShow') {
      // task.data[index].systemTime = new Date().getTime()
    }
  }
})
