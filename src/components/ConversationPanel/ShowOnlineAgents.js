import React, { Component } from 'react';
import { Avatar, Tooltip, Typography, Badge, Skeleton } from 'antd';
const { Title } = Typography;
export default class ShowOnlineAgents extends Component {
  state = {
    loading: false,
    onlineAgents: [
      {
        id: '1',
        fullname: 'Mohamed amine',
        avatarSrc: ''
      },
      {
        id: '2',
        fullname: 'Mohamed amine',
        avatarSrc: ''
      }
    ]
  };
  render() {
    return (
      <div
        style={{
          height: '85px',
          overflowY: 'auto',
          minWidth: '345px'
        }}
      >
        <Title level={4}>
          Online ({this.state.onlineAgents.length}){' '}
          <Badge status="success" dot />
        </Title>
        <Skeleton loading={this.state.loading}>
          {this.state.onlineAgents.map(agent => {
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
        </Skeleton>
      </div>
    );
  }
}
