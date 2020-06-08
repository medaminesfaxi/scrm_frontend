import React, { Component } from 'react';
import styles from './styles.module.css';
import { Form, Input, Icon, Button } from 'antd';
import { Request } from './../shared/utils';
class SettingsForm extends Component {
  state = {
    loading: false,
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        Request('PUT', '/api/user/reset_password', {
          oldPassword: values.password,
          newPassword: values.newPassword,
        });
        this.setState({ loading: false });
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
    return (
      <article>
        <div className={styles.banner}>
          <h1>Settings</h1>
        </div>
        <div className={styles.container + '  ' + styles.bigger__container}>
          <h1>Reset your password</h1>
          <Form>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your old password!',
                  },
                  { min: 6 },
                ],
              })(
                <Input.Password
                  prefix={<Icon type="lock" className={styles.input__icon} />}
                  placeholder="Old password"
                />
              )}
            </Form.Item>
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

const Signup = Form.create({ name: 'SettingsForm' })(SettingsForm);
export default Signup;
