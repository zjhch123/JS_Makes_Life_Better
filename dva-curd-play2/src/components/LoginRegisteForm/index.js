import React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva'
import styles from './style.less'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.type = this.props.type === 'login' ? 'Login' : 'Registe'
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.dispatch({ type: `user/${this.props.type}`, payload: values })
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['login-container']}>
        <h1>{ this.type }</h1>
        <Form onSubmit={this.handleSubmit} className={styles["login-form"]}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default connect(() => ({}))(WrappedNormalLoginForm)