import React from 'react';
import UserTable from '../components/UserTable'
import { connect } from 'dva';
import { Route, Switch, Redirect, Link } from 'dva/router';
import styles from './IndexPage.css';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

class IndexPage extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.history = this.props.history
  }

  logout = () => {
    this.dispatch({type: 'user/logout'})
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className={styles["logo"]} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to='/index/list'>List</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/index/about'>About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/index/help'>Help</Link>
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              <a onClick={() => this.logout()}>Logout</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '20px 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
              <Route path='/index/' exact component={UserTable} />
              <Route path='/index/list' component={UserTable} />
              <Route path='/index/about' component={() => <div>About</div>} />
              <Route path='/index/help' component={() => <div>help</div>}/>
              <Redirect to='/index/'/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
