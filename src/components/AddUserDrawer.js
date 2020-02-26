import React from 'react';
import { Drawer, Button } from 'antd';
import AddUserForm from './AddUserForm';

class AddUser extends React.Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button
          type="primary"
          icon="plus"
          style={{ marginBottom: '22px' }}
          onClick={this.showModal}
        >
          Add a new agent
        </Button>
        <Drawer
          title="Add a new user"
          width={460}
          footer={null}
          onClose={this.handleCancel}
          visible={visible}
        >
          <AddUserForm
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
          />
        </Drawer>
      </div>
    );
  }
}
export default AddUser;
