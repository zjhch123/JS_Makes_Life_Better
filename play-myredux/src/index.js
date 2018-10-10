import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from './redux/'
import { Provider } from './react-redux'

const newsReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        list: action.payload.list
      }
    default: 
      return state
  }
}

const store = createStore(newsReducer)


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
