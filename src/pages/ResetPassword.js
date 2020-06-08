import React, { Component } from 'react';
import styles from './styles.module.css';
import { Form, Input, Icon, Button, Result } from 'antd';
import { Request } from './../shared/utils';
import { Link } from 'react-router-dom';

class ResetPasswordForm extends Component {
  state = {
    updated: false,
    loading: false,
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res = await Request('PUT', '/api/resetPassword', {
          token: this.props.match.params.token,
          password: values.newPassword,
        });
        if (res.status === 200) {
          this.setState({ updated: true });
        }
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Please repeat your password correctly!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    if (this.state.updated) {
      return (
        <article>
          <div className={styles.container}>
            <Result
              status="success"
              title="Password updated successfully"
              extra={
                <Button type="primary">
                  <Link to="/login">Login page</Link>
                </Button>
              }
            />
          </div>
        </article>
      );
    } else
      return (
        <article>
          <div className={styles.container}>
            <h1>Reset your password</h1>
            <Form>
              <Form.Item hasFeedback>
                {getFieldDecorator('newPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your new password!',
                    },
                    { min: 6 },
                    { validator: this.validateToNextPassword },
                  ],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" className={styles.input__icon} />}
                    placeholder="New password"
                  />
                )}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your old password!',
                    },
                    { validator: this.compareToFirstPassword },
                  ],
                })(
                  <Input.Password
                    onBlur={this.handleConfirmBlur}
                    prefix={<Icon type="lock" className={styles.input__icon} />}
                    placeholder="Repeat new password"
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
