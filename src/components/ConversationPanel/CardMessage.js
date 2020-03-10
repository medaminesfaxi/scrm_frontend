import React, { Component } from 'react';
import { Card, Avatar, Icon, Tag } from 'antd';
import { formatText } from '../../shared/utils';
import { withRouter } from 'react-router-dom';

const colors = {
  facebook: '#3b5998',
  instagram: '#f46f30'
};
const { Meta } = Card;
class CardMessage extends Component {
  render() {
    const { from, channel, lastMessage, assignedTo } = this.props;
    return (
      <div>
        <Card
          hoverable
          style={
            this.props.conversationId.toString() === this.props.match.params.id
              ? {
                  position: 'relative',
                  background: '#D8ECFF',
                  border: '2px solid rgb(13, 140, 255)'
                }
              : { position: 'relative' }
          }
        >
          <Meta
            avatar={<Avatar icon="user" />}
            title={from}
            description={formatText(lastMessage)}
          />
          <Icon
            type={channel}
            theme="filled"
            style={{
              position: 'absolute',
              right: '0',
              color: colors[channel],
              bottom: 0,
              fontSize: '22px'
            }}
          />
          {assignedTo !== 1 && (
            <Tag
              color="red"
              style={{
                position: 'absolute',
                right: '152px',
                top: '22px',
                fontSize: '14px'
              }}
            >
              Live
            </Tag>
          )}
        </Card>
      </div>
    );
  }
}
export default withRouter(CardMessage);
