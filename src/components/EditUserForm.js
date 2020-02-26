import React from 'react';
import { Form, Button } from 'antd';
import styles from '../pages/styles.module.css';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = ['Mangement', 'Finance'];
const plainOptions = ['Mangement', 'Finance', 'IT'];
const plainOptions_two = ['French', 'English', 'Arabic'];
class EditUserForm extends React.Component {
  state = {
    checkedListSkills: defaultCheckedList,
    checkedListLanguages: [],
    confirmDirty: false,
    loading: false
  };

  onChangeSkills = checkedListSkills => {
    this.setState({ checkedListSkills });
  };
  onChangeLanguages = checkedListLanguages => {
    this.setState({ checkedListLanguages });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          this.setState({ loading: true });
          this.props.handleOk();
          this.props.form.resetFields();
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
            Update
          </Button>
        </Form>
      </div>
    );
  }
}
export default Form.create({ name: 'AddUserForm' })(EditUserForm);
