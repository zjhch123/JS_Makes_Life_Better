import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from './react-redux'

import { getNews } from './actions/news'

class App extends Component {

  componentDidMount() {
    this.props.add()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            this.props.list.map(i => (
              <p key={i}>{i}</p>
            ))
          }
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ news }) => ({
  list: news.list
})

const mapDispatchToProps = (dispatch) => ({
  add() {
    dispatch(getNews())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
