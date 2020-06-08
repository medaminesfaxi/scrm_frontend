import React, { Component } from 'react';
import { Select, Divider, Button, Avatar } from 'antd';
import { authService } from '../../services/authService';
import { Request } from '../../shared/utils';

const { Option } = Select;
export default class Header extends Component {
  state = {
    users: [],
    loading: false,
  };
  onChangeAssignSelection = async (value) => {
    await Request(
      'PUT',
      '/api/conversations/assign/' + this.props.conversationId,
      {
        id: value,
      }
    );
    window.location = '/conversations';
  };
  resolveConversation = async () => {
    this.setState({ loading: true });
    await Request('PUT', '/api/conversations/' + this.props.conversationId, {
      author: authService.getCurrentUser().fullname,
    });
    this.setState({ loading: false });
    window.location = '/conversations';
  };
  componentDidMount() {
    this.mounted = true;
    const fetchUser = async () => {
      const res = await Request('GET', '/api/admin/users');
      if (this.mounted) {
        let filteredUsers = res.data.filter(
          (user) => user._id !== authService.getCurrentUser().id
        );
        this.setState({ users: filteredUsers });
      }
    };
    fetchUser();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    if (!this.props.taken) {
      return (
        <>
          <div
            style={{
              padding: '12px',
              background: '#fff',
            }}
          >
            <Select
              style={{ width: 200 }}
              placeholder="Assign to"
              onChange={this.onChangeAssignSelection}
            >
              {this.state.users.map((user) => {
                return (
                  <Option key={user._id} value={user._id}>
                    <Avatar
                      src={user.avatarSrc}
                      size={16}
                      icon="user"
                      style={{ margin: '2px', cursor: 'pointer' }}
                    />
                    {'      '}
                    {user.fullname}
                  </Option>
                );
              })}
            </Select>
            <Button
              onClick={this.resolveConversation}
              type="primary"
              shape="round"
              style={{ float: 'right', background: '#5553B7' }}
              loading={this.state.loading}
            >
              Resolve conversation
            </Button>
          </div>
          <Divider />
        </>
      );
    }
    if (this.props.isBot)
      return (
        <Button type="primary" size="large" onClick={this.props.takeoverChat}>
          Assign to me
        </Button>
      );
    else return null;
  }
}
