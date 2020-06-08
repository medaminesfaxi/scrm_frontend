import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import { formatText } from '../../shared/utils';
import { withRouter } from 'react-router-dom';

const colors = {
  facebook: '#3b5998',
  instagram: '#f46f30',
};
const { Meta } = Card;
class CardMessage extends Component {
  state = {
    imageIsReady: false,
  };
  componentDidMount() {
    const img = new Image();
    img.onload = () => {
      this.setState({
        imageIsReady: true,
      });
    };
    img.onerror = () => {
      this.setState({
        imageIsReady: true,
      });
    };
    img.src = this.props.customerAvatar;
  }

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
                  background: '#D8ECFF',
                  border: '2px solid rgb(13, 140, 255)',
                }
              : { position: 'relative' }
          }
        >
          <Meta
            avatar={
              this.state.imageIsReady ? (
                <Avatar src={this.props.customerAvatar} icon="user" />
              ) : (
                <Icon
                  type="loading"
                  spin
                  style={{
                    color: '#1890ff',
                    fontSize: '26px',
                  }}
                />
              )
            }
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
              fontSize: '22px',
            }}
          />
        </Card>
      </div>
    );
  }
}
export default withRouter(CardMessage);
