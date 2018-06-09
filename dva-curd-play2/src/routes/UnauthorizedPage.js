import React from 'react'
import {
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'dva/router'
import { connect } from 'dva'
import LoginOrRegiste from '../components/LoginRegisteForm'

function UnauthorizedPage({
  dispatch,
  errorMsg,
  isLogin,
  isPending
}) {
  if (isLogin) {
    return <Redirect to="/index"/>
  }
  return (
    <div style={{textAlign: 'center', flex: '1'}}>
      <h1>403 Forbidden</h1>
      <p>{ errorMsg }</p>
      <p>{ isPending ? 'Loading...' : '' }</p>
      <p>Please <Link to="/auth/login">login</Link> or <Link to="/auth/registe">registe</Link></p>
      <Switch>
        <Route path="/auth/login" component={() => <LoginOrRegiste type="login"/>}></Route>
        <Route path="/auth/registe" component={() => <LoginOrRegiste type="registe"/>}></Route>
      </Switch>
    </div>
  )
}

export default withRouter(connect((state) => ({errorMsg: state.user.errorMsg, isLogin: state.user.isLogin, isPending: state.user.isPending}))(UnauthorizedPage))
