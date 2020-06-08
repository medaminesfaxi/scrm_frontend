import React from 'react';
import { Drawer, Button } from 'antd';
import EditUserForm from './EditUserForm';

class EditUserDrawer extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const { fullname } = this.props;
    return (
      <>
        <Button
          loading={this.props.optionsLoading}
          shape="circle"
          onClick={this.showModal}
          type="primary"
          size="small"
          icon="edit"
        ></Button>
        <Drawer
          title={'Edit user ' + fullname}
          width={460}
          footer={null}
          onClose={this.handleCancel}
          visible={visible}
        >
          <EditUserForm
            userId={this.props.userId}
            checkedLanguages={this.props.checkedLanguages}
            checkedSkills={this.props.checkedSkills}
            skillsOptions={this.props.skillsOptions}
            languagesOptions={this.props.languagesOptions}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
          />
        </Drawer>
      </>
    );
  }
}
export default EditUserDrawer;
