import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import TabPane from './TabPane';
import Portal from './Portal';
import Text from './Text';
import Radio from './Radio';

class App extends Component {
  static childContextTypes = {
    color: PropTypes.string
  }
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this) // ReactDOM 方法
  }

  getChildContext() {
    return {
      color: 'red'
    }
  }
  render() {
    return (
      <div className="tabs">
        <Tabs onChange={(order) => {}}>
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
