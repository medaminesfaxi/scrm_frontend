import React, { Component } from 'react';
import styles from './styles.module.css';
import { emailPattern } from './../shared/utils';
import { Form, Icon, Input, Button } from 'antd';

class ResetPasswordForm extends Component {
  state = {
    loading: false
  };
  handleSubmit = () => {
    this.props.history.push('/login');
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <article>
        <div className={styles.container}>
          <h1>Reset Password</h1>
          <Form>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your email!' },
                  {
                    pattern: emailPattern,
                    message: 'Please input a valid email!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="mail" className={styles.input__icon} />}
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Button
              disabled={loading}
              type="primary"
              htmlType="submit"
              className={styles.btn}
              onClick={this.handleSubmit}
            >
              Reset
            </Button>
          </Form>
        </div>
      </article>
    );
  }
}
const ResetPassword = Form.create({ name: 'ResetPasswordForm' })(
  ResetPasswordForm
);
export default ResetPassword;
