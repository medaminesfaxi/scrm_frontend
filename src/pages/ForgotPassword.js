import React, { Component } from 'react';
import styles from './styles.module.css';
import { emailPattern, Request } from './../shared/utils';
import { Form, Icon, Input, Button, Result } from 'antd';
class ForgotPasswordForm extends Component {
  state = {
    loading: false,
    emailSent: false,
  };
  handleSubmit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        let res = await Request('POST', '/api/forgotPassword', {
          email: values.email,
        });
        this.setState({ loading: false, emailSent: res.status === 200 });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    if (this.state.emailSent) {
      return (
        <article>
          <div className={styles.container}>
            <Result status="success" title="Email sent successfully" />
          </div>
        </article>
      );
    } else
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
                      message: 'Please input a valid email!',
                    },
                  ],
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
const ForgotPassword = Form.create({ name: 'ForgotPasswordForm' })(
  ForgotPasswordForm
);
export default ForgotPassword;
