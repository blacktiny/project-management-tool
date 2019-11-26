import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class TimeProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepTime: 0,
      curTime: 0
    }
  }

  componentDidMount() {
    const { endTime, startTime, inProgress } = this.props
    this.setState({ stepTime: endTime / 100, curTime: startTime })

    if (inProgress) this.timer = setInterval(this.intervalTimeFunc, 1000)
  }

  componentDidUpdate(prevProps) {
    const { inProgress } = this.props
    if (prevProps.inProgress !== inProgress) {
      if (inProgress) this.timer = setInterval(this.intervalTimeFunc, 1000)
      else this.clearTimer()
    }
  }

  componentWillUnmount() {
    const { inProgress } = this.props

    if (inProgress) {
      this.clearTimer()
    }
  }

  intervalTimeFunc = () => {
    let { curTime } = this.state
    const { taskId, endTime, hookAfterTimerFinished } = this.props

    curTime ++

    if (curTime === endTime) {
      clearInterval(this.timer)
      hookAfterTimerFinished(taskId)
    }

    this.setState({ curTime })
  }

  clearTimer = () => {
    clearInterval(this.timer)
  }

  getTimeLabel = (curTime) => {
    const hour = parseInt(curTime / 3600) < 10 ? '0' + parseInt(curTime / 3600) : parseInt(curTime / 3600)
    const minute = parseInt(curTime % 3600 / 60) < 10 ? '0' + parseInt(curTime % 3600 / 60) : parseInt(curTime % 3600 / 60)
    const second = (curTime % 60) < 10 ? '0' + (curTime % 60) : (curTime % 60)

    return hour + ':' + minute + ':' + second
  }

  render() {
    const { stepTime, curTime } = this.state

    const curPercent = curTime / stepTime

    const timeLabel = this.getTimeLabel(curTime)

    return (
      <div className='time-progress-bar'>
        <div className='time-label'>{timeLabel}</div>
        <div className='progress-bar-content'>
          <div className='title'>Time</div>
          <div className='container'>
            <div className='fill-content' style={{ width: `${curPercent}%`}}></div>
          </div>
          {/* <div className='percent-value'>{Number(curPercent).toFixed(2)} %</div> */}
        </div>
      </div>
    )
  }
}

TimeProgressBar.propTypes = {
  taskId: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  inProgress: PropTypes.bool.isRequired,
  hookAfterTimerFinished: PropTypes.func.isRequired,
}

export default TimeProgressBar