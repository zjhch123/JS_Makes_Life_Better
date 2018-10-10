import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from './react-redux'

class App extends Component {

  componentDidMount() {
    this.props.add()
  }

  render() {
    console.log(this.props)
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

const mapStateToProps = (state) => ({
  list: state.list
})

const mapDispatchToProps = (dispatch) => ({
  add() {
    dispatch({ type: 'ADD', payload: { list: [1, 2, 3, 4, 5] } }) 
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
