const tasks = [
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

exports.load = async function (data) {
  const { userId } = data

  let picked = userId === 'all' ? tasks : tasks.find(item => item.userId === userId)

  return { data: picked }
}