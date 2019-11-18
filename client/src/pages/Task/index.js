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

const mockup = [
  {
    id: 'aaaaa',
    userId: 'anton',
    inProgress: false,
    isFinished: false,

    // TimeProgressBar Props
    startTime: 40,
    endTime: 60,

    // ResizableProgressBar Props
    progressPercent: 80
  },
  {
    id: 'bbbbb',
    userId: 'xianru',
    inProgress: true,
    isFinished: false,
    startTime: 0,
    endTime: 60,
    progressPercent: 0
  },
  {
    id: 'ccccc',
    userId: 'yinyong',
    inProgress: false,
    isFinished: false,
    startTime: 40,
    endTime: 200,
    progressPercent: 40
  },
  {
    id: 'ddddd',
    userId: 'yinyong',
    inProgress: false,
    isFinished: false,
    startTime: 100,
    endTime: 1000,
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

    const index = items.findIndex(item => { return item.id === taskId })
    items[index].inProgress = !items[index].inProgress

    this.setState({ items })
  }

  onTimerFinished = (taskId) => {
    const { items } = this.state

    const index = items.findIndex(item => { return item.id === taskId })
    items[index].inProgress = !items[index].inProgress
    items[index].isFinished = true

    this.setState({ items })
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
                              <div {...provided.dragHandleProps}>
                                <TimeProgressBar
                                  taskId={item.id}
                                  startTime={item.startTime}
                                  endTime={item.endTime}
                                  inProgress={item.inProgress}
                                  callBackAfterTimerFinished={this.onTimerFinished}
                                />
                              </div>
                              <ResizableProgressBar
                                index={index}
                                percent={item.progressPercent}
                                {...progressbarInfo}
                              />
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
