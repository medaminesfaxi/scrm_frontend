import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { emailPattern } from './../shared/utils';

class SignupForm extends React.Component {
  state = {
    confirmDirty: false,
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          this.setState({ loading: true });
          console.log(process.env.REACT_APP_API_URL);
          const res = await axios.post(process.env.REACT_APP_API_URL, {
            email: values.email,
            password: values.password
          });
          console.log(res);
        } catch (e) {
          this.setState({ loading: false });
          console.log(e);
        }
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
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
        <div className={styles.container}>
          <h1>Vneuron SCRM</h1>
          <p>Create an admin account.</p>
          <Form>
            <Form.Item hasFeedback>
              {getFieldDecorator('fullname', {
                rules: [
                  { required: true, message: 'Please input your Full Name' },
                  { min: 4 },
                  { max: 20 }
                ]
              })(
                <Input
                  prefix={<Icon type="user" className={styles.input__icon} />}
                  placeholder="Full Name"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your Email!' },
                  {
                    pattern: emailPattern,
                    message: 'Please input a valid Email!'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="mail" className={styles.input__icon} />}
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your password!' },
                  { min: 6 },
                  { validator: this.validateToNextPassword }
                ]
              })(
                <Input.Password
                  prefix={<Icon type="lock" className={styles.input__icon} />}
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: 'Please confirm your password!' },
                  { validator: this.compareToFirstPassword }
                ]
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  prefix={<Icon type="lock" className={styles.input__icon} />}
                  placeholder="Repeat password"
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
              Sign Up
            </Button>
          </Form>
        </div>
        <div className={styles.container}>
          <p>
            Have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </article>
    );
  }
}
const Signup = Form.create({ name: 'SignupForm' })(SignupForm);
export default Signup;
