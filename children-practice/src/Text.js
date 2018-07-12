import React, { Component } from 'react';
import EventEmit from './EventEmit'
import classnames from 'classnames'
import './index.css'





export default class Text extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      clickCounts: 0
    }
  }

  componentDidMount() {
    this.emitter = EventEmit.on('switch', (index) => {
      this.setState({
        text: index
      })
    })
  }

  componentWillUnmount() {
    EventEmit.removeListener('switch', this.emitter)
  }
  
  clickText() {
    console.log(this.state.clickCounts % 5)
    this.setState({
      clickCounts: this.state.clickCounts + 1
    })
  }

  render() {
    const textClass = classnames({
      text: true,
      'text-1': this.state.clickCounts % 5 === 1,
      'text-2': this.state.clickCounts % 5 === 2,
      'text-3': this.state.clickCounts % 5 === 3,
      'text-4': this.state.clickCounts % 5 === 4
    })
    return (
    <p 
      onClick={() => this.clickText()}
      className={textClass}>
      { this.props.children + this.state.text }
    </p>
    )
  }
}