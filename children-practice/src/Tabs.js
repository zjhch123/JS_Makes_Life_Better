import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventEmit from './EventEmit'

function readonly(_, name, descriptor) {
  descriptor.writable = false
  return descriptor
}


function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}


export default class Tabs extends Component {

  @readonly
  id = 999

  static propTypes = {
    defaultActiveIndex: PropTypes.number
  }

  static defaultProps = {
    defaultActiveIndex: 0
  }

  static contextTypes = {
    color: PropTypes.string
  }

  constructor() {
    super()

    this.state = {
      index: -1
    }
  }

  @log
  switchToTab(index) {
    if (index === this.state.index) { return }
    this.props.onChange && this.props.onChange(index)
    EventEmit.emit('switch', index)
    this.setState({
      index
    })
  }

  judgeIsActive(order) {
    const { index } = this.state
    const { defaultActiveIndex } = this.props
    return index === -1 ? defaultActiveIndex === order : index === order
  }
  
  getTabOrder() {
    const { children: panels } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) return
      const order = parseInt(child.props.order, 10)
      const isActive = this.judgeIsActive(order)
      return (
        <li 
          onClick={() => this.switchToTab(order)}
          style={{color: isActive ? 'red' : 'black'}}>
          { child.props.tab }
        </li>
      )
    })
  }

  getTabPanes() {
    const { children: panels } = this.props
    return React.Children.map(panels, (child) => {
      if (!child) return
      const order = parseInt(child.props.order, 10)
      const isActive = this.judgeIsActive(order)
      if (isActive) {
        return (
          <div>
            { child.props.children }
          </div>
        )
      }
      return;
    })
  }

  render() {
    return (
      <div>
        <ul>
          { this.getTabOrder() }
        </ul>
        <div style={{color: this.context.color}}>
          { this.getTabPanes() }
        </div>
      </div>
    )
  }
}