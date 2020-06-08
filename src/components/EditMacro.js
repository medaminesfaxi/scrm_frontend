import React, { Component } from 'react';
import { Modal, Button, Input, Form } from 'antd';
const { TextArea } = Input;
class AddMacroForm extends Component {
  state = {
    visible: false,
    confirmLoading: true,
    values: {
      name: '',
      text: ''
    }
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
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        await this.props.editMacro(values, this.props.macro._id);
        this.setState({ confirmLoading: false });
        this.props.form.resetFields();
        this.setState({
          visible: false
        });
      }
    });
  };
  handleInputChange = e => {
    const { name, text } = this.props.macro;
    const value = e.target.value;
    if (name !== value && text !== value)
      this.setState({ confirmLoading: false });
    else this.setState({ confirmLoading: true });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, text } = this.props.macro;
    return (
      <>
        <Button
          shape="circle"
          onClick={this.showModal}
          type="primary"
          size="small"
          icon="edit"
        ></Button>
        <Modal
          footer={null}
          title="Edit macro"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form initialvalues={{ name, text }}>
            <Form.Item>
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: 'Please input a name' }]
              })(
                <Input
                  placeholder="Macro's name"
                  onChange={this.handleInputChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('text', {
                initialValue: text,
                rules: [{ required: true, message: 'Please input some text' }]
              })(
                <TextArea
                  rows={4}
                  placeholder="type some text"
                  onChange={this.handleInputChange}
                />
              )}
            </Form.Item>
            <Button
              disabled={this.state.confirmLoading}
              type="primary"
              htmlType="submit"
              onClick={this.handleOk}
            >
              EDIT
            </Button>
          </Form>
        </Modal>
      </>
    );
  }
}
export default Form.create({ name: 'addMacro' })(AddMacroForm);
