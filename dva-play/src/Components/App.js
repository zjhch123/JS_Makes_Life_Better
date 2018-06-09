import { Route, Link, Switch } from 'dva/router'
import { connect } from 'dva'

const Default = () => (
  <p>Default</p>
)
const Two = ({ match }) => (
  <p>{match.params.pageN}</p>
)

const App = ({ match, count, dispatch }) => {
  return (
    <div>
      <div>
        <p>分页器</p>
        <ul>
          <li><Link to={`${match.url}/page2`}>2</Link></li>
          <li><Link to={`${match.url}/page3`}>3</Link></li>
          <li><Link to={`${match.url}/page4`}>4</Link></li>
        </ul>
      </div>
      <div>
        <p>计数器</p>
        <p>{count.record}</p>
        <p>{count.current}</p>
        <button type="button" onClick={() => dispatch({ type: 'count/add' })}>+</button>
        <button type="button" onClick={() => dispatch({ type: 'count/minus' })}>-</button>
      </div>
      <main>
        <p>分页内容</p>
        <Switch>
          <Route path={`${match.url}/:pageN`} component={Two} />
          <Route component={Default} />
        </Switch>
      </main>
    </div>
  )
}

export default connect((state) => ({ count: state.count }))(App)