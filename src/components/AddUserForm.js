import React from 'react';
import { Form, Input, Button, Icon, Switch } from 'antd';
import styles from '../pages/styles.module.css';
import { emailPattern } from './../shared/utils';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Mangement', 'Finance', 'IT'];
const plainOptions_two = ['french', 'english', 'arabic'];
class AddUserForm extends React.Component {
  state = {
    checkedListSkills: [],
    checkedListLanguages: [],
    is_admin: false,
    confirmDirty: false,
    loading: false
  };

  onChangeSkills = checkedListSkills => {
    this.setState({ checkedListSkills });
  };
  onChangeLanguages = checkedListLanguages => {
    this.setState({ checkedListLanguages });
  };
  onChangeAdmin = checked => {
    this.setState({ is_admin: checked });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          this.setState({ loading: true });
          let user = {
            skills: this.state.checkedListSkills,
            languages: this.state.checkedListLanguages,
            is_admin: this.state.is_admin,
            ...values
          };
          this.props.handleCreateUser(user);
          this.props.handleOk();
          this.props.form.resetFields();
          this.setState({
            checkedListSkills: [],
            checkedListLanguages: [],
            is_admin: false
          });
          this.setState({ loading: false });
        } catch (e) {
          this.setState({ loading: false });
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Form>
          <Form.Item>
            Admin :{'   '}
            <Switch
              checked={this.state.is_admin}
              onChange={this.onChangeAdmin}
            />
          </Form.Item>
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
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
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
          <Form.Item label="Select skills">
            <CheckboxGroup
              value={this.state.checkedListSkills}
              onChange={this.onChangeSkills}
              options={plainOptions}
            />
          </Form.Item>
          <Form.Item label="Select languages">
            <CheckboxGroup
              value={this.state.checkedListLanguages}
              onChange={this.onChangeLanguages}
              options={plainOptions_two}
            />
          </Form.Item>
          <Button
            disabled={loading}
            type="primary"
            htmlType="submit"
            className={styles.btn}
            onClick={this.handleSubmit}
          >
            Create
          </Button>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: 'AddUserForm' })(AddUserForm);
