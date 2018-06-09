import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import AuthorizedPage from './routes/AuthorizedPage';
import UnauthorizedPage from './routes/UnauthorizedPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <AuthorizedPage path="/index" component={IndexPage} />
        <Route path="/auth" component={UnauthorizedPage} />
        <Redirect to="/auth"/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
