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
      startTime: 0,
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
      progressPercent: 40,
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
  [actionTypes.ADD_NEW_TASK]: (task, { data }) => {
    task.data.push(data)
  },
  [actionTypes.START_TIMER]: (task, { index, key, value }) => {
    task.data[index][key] = value
  }
})
