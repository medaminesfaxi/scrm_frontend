import React, { Component } from 'react';
import { validImage } from '../shared/utils';
import { Button, Avatar, Form, Icon, Input } from 'antd';
import styles from './styles.module.css';

let upload = React.createRef();

class AccountForm extends Component {
  state = {
    loading: false
  };
  handleUploadBtn = () => {
    upload.current.click();
  };
  handleUploadFile = async e => {
    if (validImage(e.target.files[0]) === false) {
      return false;
    }
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
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
            icon="user"
            src={avatarSrc}
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
                rules: [{ required: false }, { min: 6 }]
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
