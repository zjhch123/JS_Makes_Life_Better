import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, combineReducers, applyMiddleware } from './redux/'
import { Provider } from './react-redux'

import thunk from './middlewares/thunk'
import reducers from './reducers'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

