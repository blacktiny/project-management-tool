import actionTypes from '../../constants/actionTypes'
import { createProducer } from '../reducers/utilities'

let initialState = {
  data: [
    {
      id: 'aaaaa',
      userId: 'anton',
      inProgress: false,
      isFinished: false,
      isShow: true,
  
      // TimeProgressBar Props
      startTime: 40,
      endTime: 60,
      systemTime: -1,
  
      // ResizableProgressBar Props
      progressPercent: 80,
  
      // comments
      comments: [
        {
          comment: 'making database',
          dateTime: '2019/11/19'
        },
        {
          comment: 'creating tables',
          dateTime: '2019/11/19'
        },
      ]
    },
    {
      id: 'bbbbb',
      userId: 'xianru',
      inProgress: true,
      isFinished: false,
      isShow: true,
      startTime: 50,
      endTime: 60,
      systemTime: -1,
      progressPercent: 0,
      comments: [
        {
          comment: 'editing',
          dateTime: '2019/11/19'
        },
        {
          comment: 'updating',
          dateTime: '2019/11/19'
        },
      ]
    },
    {
      id: 'ccccc',
      userId: 'yinyong',
      inProgress: false,
      isFinished: false,
      isShow: true,
      startTime: 40,
      endTime: 200,
      systemTime: -1,
      progressPercent: 100,
      comments: [
        {
          comment: 'debugging',
          dateTime: '2019/11/19'
        },
        {
          comment: 'developing',
          dateTime: '2019/11/19'
        },
      ]
    },
    {
      id: 'ddddd',
      userId: 'yinyong',
      inProgress: false,
      isFinished: false,
      isShow: true,
      startTime: 100,
      endTime: 1000,
      systemTime: -1,
      progressPercent: 10,
      comments: [
        {
          comment: 'in progress',
          dateTime: '2019/11/19'
        },
        {
          comment: 'completed',
          dateTime: '2019/11/19'
        },
      ]
    }
  ]
}

export default createProducer(initialState, {
  [actionTypes.GET_TASKS]: (task, { data }) => {
    task.data.forEach(item => {
      if (data.userId === item.userId || data.userId === 'all') {
        if (item.inProgress && !item.isShow) {
          item.startTime += parseInt((new Date().getTime() - item.systemTime) / 1000)
          if (item.startTime >= item.endTime) {
            item.inProgress = false
            item.isFinished = true
            item.systemTime = -1
            item.startTime = item.endTime
          }
          item.isShow = true
        }
      } else {
        if (item.inProgress && item.isShow) {
          item.systemTime = new Date().getTime()
          item.isShow = false
        }
      }
    })
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
