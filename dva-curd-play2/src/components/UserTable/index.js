import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd'
import { withRouter } from 'dva/router'
import qs from 'query-string';

class UserTable extends React.Component {

  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.history = this.props.history
  }

  componentDidMount() {
    this.page = qs.parse(this.history.location.search).page || 1
    this.getData()
  }

  getData() {
    const search = qs.parse(this.history.location.search)
    search.page = this.page
    this.history.replace({
      path: this.history.path,
      search: '?' + qs.stringify(search)
    })
    this.dispatch({ type: 'list/get', payload: { page: this.page } })
  }
 
  pageChange(val) {
    this.page = val
    this.getData()
  }

  deleteItem(id) {
    this.dispatch({ type: 'list/delete', payload: { id: id } })
  }

  render() {
    const { 
      list: dataSource,
      total
    } = this.props
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '操作',
        key: 'action',
        render: (rext, record) => (
          <span>
            <a onClick={() => this.deleteItem(record.id)}>删除</a>
          </span>
        )
      }
    ]
    return (
      <div>
        <Table
          pagination={{
            pageSize: 8,
            current: ~~this.page,
            total,
            onChange: (val) => this.pageChange(val)
          }}
          dataSource={dataSource}
          columns={columns}
          rowKey="id"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.list.list,
  total: state.list.total
})

export default withRouter(connect(mapStateToProps)(UserTable))
