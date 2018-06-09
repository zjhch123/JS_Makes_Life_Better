import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'

const me = () => (
  <p>About me</p>
)

const other = () => (
  <p>About other</p>
)

export default ({ match }) => (
  <div>
    <p>about</p>
    <ul>
      <li><Link to={`${match.url}/me`}>me</Link></li>
      <li><Link to={`${match.url}/other`}>other</Link></li>
    </ul>
    <div>
      <Route path={`${match.url}/me`} component={me} />
      <Route path={`${match.url}/other`} component={other} />
    </div>
  </div>
)