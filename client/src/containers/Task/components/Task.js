import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scrollbar from 'react-smooth-scrollbar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

import CommentBox from './TaskCommentBox'

import ResizableProgressBar from '../../../components/progressbar/ResizableProgressBar'
import TimeProgressBar from '../../../components/progressbar/TimeProgressBar'

import { getTasksByUserId, addNewTask, deleteTask, updateTaskStatus } from '../../../stores/Task/actions'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const mockup = []

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentDidMount() {
    const { tasks } = this.props
    this.setState({ items: tasks })
  }

  componentDidUpdate(prevProps, prevStete) {
    const { tasks } = this.props

    if (prevProps.tasks !== tasks) this.setState({ items: tasks })
  }

  resizeProgressBarFunc = (index, curPercent) => {
    const { updateTaskStatusAction } = this.props

    updateTaskStatusAction(index, 'progressPercent', curPercent)
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
    const { tasks, updateTaskStatusAction } = this.props
    const index = tasks.findIndex(item => { return item.id === taskId })
    updateTaskStatusAction(index, 'inProgress', !tasks[index].inProgress)
  }

  onTimerFinished = (taskId) => {
    const { tasks, updateTaskStatusAction } = this.props

    const index = tasks.findIndex(item => { return item.id === taskId })
    updateTaskStatusAction(index, 'isFinished', true)
  }

  onAddNewTask = () => {
    const { addNewTaskAction } = this.props
    const curTime = new Date().getTime()
    const newTask = {
      id: 'newTask_' + curTime,
      userId: 'user_' + curTime,
      inProgress: false,
      isFinished: false,
      isShow: true,
      startTime: 0,
      endTime: 3600,
      systemTime: -1,
      progressPercent: 0,
      comments: []
    }

    addNewTaskAction(newTask)
  }

  onDeleteTask = (taskId) => {
    const { tasks, deleteTaskAction } = this.props

    const index = tasks.findIndex(item => { return item.id === taskId })
    if (tasks[index].inProgress) {
      alert(`Sorry, can't delete the task in progress. Please stop the task first.`)
      return
    }

    deleteTaskAction(taskId)
  }

  render() {
    const progressbarInfo = {
      resizeFunc: this.resizeProgressBarFunc
    }

    return (
      <div className='task'>
        <div className='task-content'>
          <div className='task-content-header'>
            <Button className='btn-add-task' onClick={this.onAddNewTask}>Add Task</Button>
          </div>
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
                                <Button
                                  color='danger'
                                  disabled={item.isFinished}
                                  className='btn-timer'
                                  onClick={() => this.onTimerStart(item.id)}>{item.inProgress ? 'Stop' : 'Start'}
                                </Button>
                                <div className='header-title' {...provided.dragHandleProps}>Title - junefox chat</div>
                                <UncontrolledDropdown>
                                  <DropdownToggle className="icon icon--right" outline color="primary">
                                    <p>Action <ChevronDownIcon /></p>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown__menu">
                                    <DropdownItem onClick={() => this.onDeleteTask(item.id)}>Delete</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
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
                                    />
                                  </div>
                                  <ResizableProgressBar
                                    index={index}
                                    percent={item.progressPercent}
                                    {...progressbarInfo}
                                  />
                                </div>
                                <CommentBox comments={item.comments} />
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

const state = ({ tasks }) => ({
  tasks: tasks.data
})

const actions = ({
  getTasksByUserIdAction: getTasksByUserId,
  addNewTaskAction: addNewTask,
  deleteTaskAction: deleteTask,
  updateTaskStatusAction: updateTaskStatus
})

export default connect(state, actions)(Task)
