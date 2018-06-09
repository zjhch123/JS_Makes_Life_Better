import React, { Component } from 'react';
import HomeLayout from './Layout/HomeLayout'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Index from './Components/Index/'
import About from './Components/About/'
class App extends Component {
  render() {
    return (
      <Router>
        <HomeLayout title="App">
          <Route exact path="/" component={Index}></Route>
          <Route path="/about" component={About}></Route>
        </HomeLayout>
      </Router>
    );
  }
}

export default App;
