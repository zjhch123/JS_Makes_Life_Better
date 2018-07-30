import React, { Component } from 'react';

import RedButton from './RedButton';
import LoadingData from './LoadingData';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  fetchData() {
    setTimeout(() => {
      this.setState({
        data: ['锄禾日当午', '汗滴禾下土', '谁知盘中餐', '粒粒皆辛苦!']
      })
    }, 2000)
  }

  render() {
    return (
      <div className="App">
        <RedButton color="blue" onClick={() => this.fetchData()}>123</RedButton>
        <LoadingData data={this.state.data} />
      </div>
    );
  }
}

export default App;
