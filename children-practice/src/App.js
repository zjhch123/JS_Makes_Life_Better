import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import PropTypes from 'prop-types';

import Portal from './Portal';
import Radio from './Radio';


const Text = ({children}) => (
  <p>{children}</p>
)

class Tabs extends Component {

  static propTypes = {
    defaultActiveIndex: PropTypes.number
  }

  static defaultProps = {
    defaultActiveIndex: 0
  }

  constructor() {
    super()
    this.state = {
      index: -1
    }
  }

  switchToTab(index) {
    if (index === this.state.index) { return }
    this.props.onChange && this.props.onChange(index)
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
        <div>
          { this.getTabPanes() }
        </div>
      </div>
    )
  }
}

class TabPane extends Component {
  static propTypes = {
    order: PropTypes.number.isRequired
  }
  render() {
    return (<div>{ this.props.children }</div>)
  }
}



class App extends Component {
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this) // ReactDOM 方法
  }
  render() {
    return (
      <div className="tabs">
        <Tabs onChange={(order) => console.log(order)}>
          <TabPane order={0} tab={'Tab1'}>Tab1 Content</TabPane>
          <TabPane order={1} tab={'Tab2'}>Tab2 Content</TabPane>
          <TabPane order={2} tab={'Tab3'}>Tab3 Content</TabPane>
        </Tabs>
        <Radio/>
        <Portal>
          <Text>123</Text>
        </Portal>
      </div>
    );
  }
}

export default App;
