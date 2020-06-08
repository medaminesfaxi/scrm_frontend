import React from 'react';
import { Form, Button } from 'antd';
import styles from '../pages/styles.module.css';
import { Checkbox } from 'antd';
import { Request } from './../shared/utils';

const CheckboxGroup = Checkbox.Group;

class EditUserForm extends React.Component {
  state = {
    checkedListSkills: [],
    checkedListLanguages: [],
    skillsOptions: [],
    languagesOptions: [],
    confirmDirty: false,
    loading: false,
  };

  componentDidMount() {
    let languages = [];
    for (let i = 0; i < this.props.checkedLanguages.length; i++) {
      languages.push(this.props.checkedLanguages[i]._id);
    }
    let skills = [];
    for (let i = 0; i < this.props.checkedSkills.length; i++) {
      skills.push(this.props.checkedSkills[i]._id);
    }
    this.setState({
      checkedListSkills: skills,
      checkedListLanguages: languages,
    });
  }
  onChangeSkills = (checkedListSkills) => {
    this.setState({ checkedListSkills });
  };
  onChangeLanguages = (checkedListLanguages) => {
    this.setState({ checkedListLanguages });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    await Request('PUT', '/api/admin/users/' + this.props.userId, {
      languages: this.state.checkedListLanguages,
      skills: this.state.checkedListSkills,
    });
    this.setState({ loading: false });
    window.location.reload();
    this.props.handleOk();
    this.props.form.resetFields();
  };

  render() {
    const { loading } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form>
          <Form.Item label="Select skills">
            <CheckboxGroup
              value={this.state.checkedListSkills}
              onChange={this.onChangeSkills}
              options={this.props.skillsOptions}
            />
          </Form.Item>
          <Form.Item label="Select languages">
            <CheckboxGroup
              value={this.state.checkedListLanguages}
              onChange={this.onChangeLanguages}
              options={this.props.languagesOptions}
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
