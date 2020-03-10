import React, { Component } from 'react';
import { Modal, Button, Input, Form } from 'antd';
const { TextArea } = Input;
class AddMacroForm extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
    this.props.form.resetFields();
  };
  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.CreateMacro(values);
        this.props.form.resetFields();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Button type="primary" size="small" onClick={this.showModal}>
          Create a new macro
        </Button>
        <Modal
          footer={null}
          title="Add a new macro"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input a name' }]
              })(<Input placeholder="Macro's name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('text', {
                rules: [{ required: true, message: 'Please input some text' }]
              })(<TextArea rows={4} placeholder="type some text" />)}
            </Form.Item>
            <Button
              disabled={this.state.confirmLoading}
              type="primary"
              htmlType="submit"
              onClick={this.handleOk}
            >
              Create
            </Button>
          </Form>
        </Modal>
      </>
    );
  }
}
export default Form.create({ name: 'AddMacro' })(AddMacroForm);
