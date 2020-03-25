import React from 'react';
import { Drawer, Button } from 'antd';
import EditUserForm from './EditUserForm';

class EditUserDrawer extends React.Component {
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
    const { loading, fullname, user_id } = this.props;
    return (
      <>
        <Button
          loading={loading}
          shape="circle"
          onClick={this.showModal}
          type="primary"
          size="small"
          icon="edit"
        ></Button>
        <Drawer
          title={'Edit user ' + fullname + ' #' + user_id}
          width={460}
          footer={null}
          onClose={this.handleCancel}
          visible={visible}
        >
          <EditUserForm
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            user_id={user_id}
          />
        </Drawer>
      </>
    );
  }
}
export default EditUserDrawer;
