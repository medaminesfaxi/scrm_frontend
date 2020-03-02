import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import { formatText } from '../../shared/utils';
import { withRouter } from 'react-router-dom';

const colors = {
  facebook: '#3b5998',
  instagram: '#f46f30'
};
const { Meta } = Card;
class CardMessage extends Component {
  render() {
    const { from, channel, lastMessage } = this.props;
    return (
      <div>
        <Card
          hoverable
          style={
            this.props.conversationId.toString() === this.props.match.params.id
              ? {
                  position: 'relative',
                  background: '#F2F2F2'
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
        </Card>
      </div>
    );
  }
}
export default withRouter(CardMessage);
