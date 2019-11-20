import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import UserNavbar from '../../components/userNavbar'
import ResizableProgressBar from '../../components/ResizableProgressBar'
import TimeProgressBar from '../../components/TimeProgressBar'

import './style.scss'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

let mockup = [
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
    progressPercent: 80
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
    progressPercent: 0
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
    progressPercent: 40
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
    progressPercent: 10
  }
]

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentDidMount() {
    this.setState({ items: mockup })
  }

  componentDidUpdate(prevProps, prevStete) {
    const { userId } = this.props.match.params

    if (prevProps.match.params.userId !== userId) {
      // update time of progressbar in progress
      mockup.forEach(item => {
        if (item.inProgress && !item.isShow) {
          item.startTime += parseInt((new Date().getTime() - item.systemTime) / 1000)
          if (item.startTime >= item.endTime) {
            item.inProgress = false
            item.isFinished = true
            item.systemTime = -1
            item.startTime = item.endTime
          }
        }
      })

      // filter by userId
      if (userId === 'all') {
        this.setState({ items: mockup })
      } else {
        const result = mockup.filter(item => item.userId === userId)
        this.setState({ items: result })
      }
    }
  }

  resizeProgressBarFunc = (index, curPercent) => {
    const { items } = this.state

    items[index].progressPercent = curPercent

    this.setState({ items })
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  onTimerStart = (taskId) => {
    const { items } = this.state

    let index = mockup.findIndex(item => { return item.id === taskId })
    mockup[index].inProgress = !mockup[index].inProgress
    
    this.setState({ items })
  }

  onTimerFinished = (taskId) => {
    const { items } = this.state

    let index = mockup.findIndex(item => { return item.id === taskId })
    mockup[index].inProgress = false
    mockup[index].isFinished = true
    mockup[index].startTime = mockup[index].endTime

    this.setState({ items })
  }

  onInProgressTimerHide = (taskId, curTime) => {
    const index = mockup.findIndex(item => { return item.id === taskId })
    mockup[index].startTime = curTime
    mockup[index].systemTime = new Date().getTime()
    mockup[index].isShow = false
  }

  render() {
    const progressbarInfo = {
      resizeFunc: this.resizeProgressBarFunc
    }

    return (
      <div className='task'>
        <UserNavbar />
        <div className='task-content'>
          <div className='drag-drop-context'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.items && this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className='item-content'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className='progress-bar-group'>
                              <div className='progress-bar-group-header'>
                                <div
                                  className={`btn-timer${item.isFinished ? ' disable' : ''}`}
                                  onClick={() => this.onTimerStart(item.id)}>{item.inProgress ? 'Stop' : 'Start'}
                                </div>
                                <div className='header-title' {...provided.dragHandleProps}>Title - junefox chat</div>
                                <div className='btn-delete'>X</div>
                              </div>
                              <div className='progress-bar-group-content'>
                                <div className='progressbar-content'>
                                  <div {...provided.dragHandleProps}>
                                    <TimeProgressBar
                                      taskId={item.id}
                                      startTime={item.startTime}
                                      endTime={item.endTime}
                                      inProgress={item.inProgress}
                                      hookAfterTimerFinished={this.onTimerFinished}
                                      hookBeforeInProgressTimerHide={this.onInProgressTimerHide}
                                    />
                                  </div>
                                  <ResizableProgressBar
                                    index={index}
                                    percent={item.progressPercent}
                                    {...progressbarInfo}
                                  />
                                </div>
                                <div className='comment-content'>
                                  <div className='comment-box'></div>
                                  <div className='view-all'>view all</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    )
  }
}

export default Task
