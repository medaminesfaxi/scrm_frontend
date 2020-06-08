import React, { Component } from 'react';
import { validImage } from '../shared/utils';
import { Button, Avatar, Form, Icon, Input } from 'antd';
import styles from './styles.module.css';
import { authService } from './../services/authService';
import { centeredNotification } from './../shared/utils';

let upload = React.createRef();

class AccountForm extends Component {
  state = {
    loading: false,
    loadingImg: false,
  };
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        await authService.updatePhoneNumber(values.phoneNumber);
        this.setState({ loading: false });
      }
    });
  };
  handleUploadBtn = () => {
    upload.current.click();
  };
  handleUploadFile = async (e) => {
    if (validImage(e.target.files[0]) === false) {
      centeredNotification('danger', 'only image is allowed');
      return false;
    }
    let file = e.target.files[0];
    const data = new FormData();
    data.append('avatar', file);
    this.setState({ loadingImg: true });
    await authService.updateUserAvatar(data);
    if (this.mounted) this.setState({ loadingImg: false });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    const { avatarSrc } = this.props;
    return (
      <article>
        <div className={styles.banner}>
          <h1>Account</h1>
        </div>
        <div className={styles.container + '  ' + styles.bigger__container}>
          <input
            id="upload"
            name="upfile"
            type="file"
            ref={upload}
            style={{ display: 'none', marginBottom: '6px' }}
            onChange={this.handleUploadFile}
          />
          <Avatar
            size={120}
            icon={this.state.loadingImg ? 'loading' : 'user'}
            src={this.state.loadingImg ? null : avatarSrc}
            style={{ marginBottom: '16px' }}
          />
          <Button
            onClick={this.handleUploadBtn}
            style={{ marginBottom: '16px' }}
          >
            Change
          </Button>
          <Form>
            <Form.Item hasFeedback>
              {getFieldDecorator('phoneNumber', {
                initialValue: authService.getCurrentUser().phone,
                rules: [{ required: true }, { min: 6 }],
              })(
                <Input
                  prefix={<Icon type="phone" className={styles.input__icon} />}
                  placeholder="Phone number"
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
              Save
            </Button>
          </Form>
        </div>
      </article>
    );
  }
}
const Account = Form.create({ name: 'AccountForm' })(AccountForm);
export default Account;
