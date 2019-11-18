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

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          id: 'aaaaa',

          // TimeProgressBar Props
          startTime: 40,
          endTime: 60,

          // ResizableProgressBar Props
          width: 500
        },
        {
          id: 'bbbbb',
          startTime: 0,
          endTime: 60,
          width: 0
        },
        {
          id: 'ccccc',
          startTime: 40,
          endTime: 200,
          width: 300
        },
        {
          id: 'ddddd',
          startTime: 100,
          endTime: 1000,
          width: 150
        }
      ]
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  resizeProgressBarFunc = (index, size) => {
    const { items } = this.state

    items[index].width = size.width

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
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className='item-content'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className='progress-bar-group'>
                              <div {...provided.dragHandleProps}>
                                <TimeProgressBar startTime={item.startTime} endTime={item.endTime} />
                              </div>
                              <ResizableProgressBar index={index} width={item.width} {...progressbarInfo} />
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
