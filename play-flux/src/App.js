import React, { Component } from 'react';
import NewsStore from './Store/News'
import { fetchNews } from './Action/News'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comments: NewsStore.getData()
    }

    this._onChange = this._onChange.bind(this)
  }

  _onChange() {
    this.setState({
      comments: NewsStore.getData()
    })
  }

  componentDidMount() {
    NewsStore.addChangeListener(this._onChange)
    fetchNews()
  }

  componentWillUnmount() {
    NewsStore.removeChangeListener(this._onChange)
  }

  render() {
    const {
      comments
    } = this.state
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {
          comments.map(item => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.content}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
