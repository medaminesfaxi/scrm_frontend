import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { emailPattern } from './../shared/utils';

class LoginForm extends React.Component {
  state = {
    loading: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });

        try {
          const res = await axios.post(process.env.REACT_APP_API_URL, {
            email: values.email,
            password: values.password
          });
        } catch (e) {
          this.setState({ loading: false });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <div className={styles.wrapper}>
        <article>
          <div className={styles.container}>
            <h1>Vneuron SCRM</h1>
            <p>Login to your account.</p>
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
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' },
                    { min: 6 }
                  ]
                })(
                  <Input.Password
                    prefix={<Icon type="lock" className={styles.input__icon} />}
                    type="password"
                    placeholder="Password"
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
                Log in
              </Button>
            </Form>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </article>
      </div>
    );
  }
}
const Login = Form.create({ name: 'LoginForm' })(LoginForm);
export default Login;
