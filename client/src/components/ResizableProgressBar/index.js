import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResizableBox } from 'react-resizable'

import './style.scss'

class ResizableProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      maxWidth: 800,
      resizableInfo: {
        width: 300,
        height: 20,
        axis: 'x',
        handle: (<strong className='resize-handler'></strong>),
        minConstraints: [0, Infinity],
        maxConstraints: [Infinity, Infinity],
        onResize: this.resize
      }
    }
  }

  resize = (e, data) => {
    const { maxWidth } = this.state
    const { index, resizeFunc } = this.props
    const curPercent = data.size.width / maxWidth * 100

    resizeFunc(index, curPercent)
  }

  /**
   * Calculate ResizableBox width
   */
  updateDimensions() {
    console.log('updateDimensions')
    let { resizableInfo } = this.state
    const maxWidth = window.innerWidth - 462

    resizableInfo.maxConstraints = [maxWidth, Infinity]
    this.setState({ maxWidth, resizableInfo })
  }

  /**
   * Add window resize event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove window resize event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { resizableInfo, maxWidth } = this.state
    const { percent } = this.props

    resizableInfo.width = maxWidth * percent / 100

    return (
      <div className='resizable-progress-bar'>
        <div className='progress-bar-content'>
          <div className='title'>Progress</div>
          <div className='container'>
            <ResizableBox className='resizable-bar' {...resizableInfo} />
          </div>
          {/* <div className='percent-value'>{Number(width / maxWidth * 100).toFixed(2)} %</div> */}
        </div>
      </div>
    )
  }
}

ResizableProgressBar.propTypes = {
  index: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired
}

export default ResizableProgressBar
