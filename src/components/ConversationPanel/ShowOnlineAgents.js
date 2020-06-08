import React, { Component } from 'react';
import { Avatar, Tooltip, Typography, Badge, Icon } from 'antd';
import IOClient from 'socket.io-client';
const { Title } = Typography;
export default class ShowOnlineAgents extends Component {
  state = {
    loading: false,
    onlineAgents: [],
  };
  componentDidMount() {
    this.mounted = true;
    this.io = IOClient(process.env.REACT_APP_API_URL);
    this.io.open();
    this.io.on('showOnlineUsers', (users) => {
      let online_users = [];
      Object.keys(users).map((key) => {
        return online_users.push(users[key]);
      });
      if (this.mounted) this.setState({ onlineAgents: online_users });
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return (
      <div
        style={{
          maxHeight: '170px',
          overflowY: 'auto',
          position: 'fixed',
          bottom: '40px',
          width: '20%',
        }}
      >
        <Title level={4}>
          {this.state.loading ? (
            <Icon
              type="loading"
              spin
              style={{ margin: '0 150px', color: '#a0c5e8' }}
            />
          ) : (
            <>
              {'Online (' + this.state.onlineAgents.length + ') '}
              <Badge status="success" dot />
            </>
          )}
        </Title>
        {this.state.onlineAgents.map((agent) => {
          return (
            <Tooltip
              key={agent.id}
              title={agent.fullname}
              style={{ zIndex: '9999' }}
            >
              <Avatar
                src={agent.avatarSrc}
                size={42}
                icon="user"
                style={{ margin: '2px', cursor: 'pointer' }}
              />
            </Tooltip>
          );
        })}
      </div>
    );
  }
}
