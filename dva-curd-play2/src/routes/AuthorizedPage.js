import {
  Route,
  Redirect,
  withRouter
} from 'dva/router'
import { connect } from 'dva'
import React from 'react'

class AuthorizedPage extends React.Component {
  render() {
    const {
      isLogin,
      component: Component,
      ...rest
    } = this.props
    return (
      <Route {...rest}
        render={(props) => {
          if (isLogin) { return <Component {...props}/> }
          else { return <Redirect to="/auth" /> }
        }}/>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin,
})

export default withRouter(connect(mapStateToProps)(AuthorizedPage))
