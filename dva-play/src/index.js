import dva from 'dva';
import { Router, Route, Switch } from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import App from './Components/App'

// 1. Initialize
const app = dva({
  history: createHistory()
});

app.model({
  namespace: 'count',
  state: {
    current: 0,
    record: 0,
  },
  reducers: {
    add (state) {
      const newCurrent = state.current + 1
      return {
        ...state,
        current: newCurrent,
        record: newCurrent > state.record ? newCurrent : state.record
      }
    },
    minus (state) {
      return {
        ...state,
        current: state.current - 1
      }
    }
  }
})

app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/in" component={App} />
    </Switch>
  </Router>
);

// 4. Start
app.start('#root');
