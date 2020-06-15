import React from 'react';
import { Card, Icon } from 'antd';
import MessageBox from './MessageBox';
import { Request } from '../../shared/utils';
import './ChatBox.css';
import IOClient from 'socket.io-client';
import { Redirect } from 'react-router-dom';

class DisplayMessages extends React.PureComponent {
  state = {
    notfound: false,
    messageListLoading: false,
    conversation: { messages: [] },
    dataLoading: true,
    loading: false,
  };
  componentDidMount() {
    this.OldconversationID = this.props.conversationId.id;
    this.skip = 0;
    this.mounted = true;
    this.io = IOClient(process.env.REACT_APP_API_URL);
    this.io.on('received', (data) => {
      this.setState({
        conversation: {
          ...this.state.conversation,
          messages: this.state.conversation.messages.concat({
            author: {
              fullname: data.author.fullname,
              id: data.author.id,
              avatarUrl: data.author.avatarUrl,
            },
            text: data.text,
            timestamp: data.timestamp,
            type: data.type,
          }),
        },
      });
      this.scrollToBottom();
    });
    const fetchData = async () => {
      this.setState({ dataLoading: true });
      let res = await Request(
        'GET',
        '/api/conversations/' +
          this.props.conversationId.id +
          '?skip=' +
          this.skip
      );
      if (this.mounted)
        if (res && res.data.length > 0) {
          this.setState(
            {
              conversation: res.data[0],
              dataLoading: false,
              notfound: false,
            },
            () => {
              this.io.emit('join', res.data[0].customer[0].id);
              this.props.getConversation(res.data[0]);
            }
          );
        } else
          this.setState({
            dataLoading: false,
            notfound: true,
          });
    };
    fetchData();
  }
  scrollToBottom = () => {
    if (this.messagesList) {
      this.messagesList.scrollTop =
        this.messagesList.scrollHeight - this.messagesList.clientHeight;
    }
  };
  componentDidUpdate() {
    this.newConversationID = this.props.conversationId.id;
    if (this.newConversationID !== this.OldconversationID) {
      this.OldconversationID = this.newConversationID;
      this.skip = 0;
      const fetchData = async () => {
        this.setState({ dataLoading: true });
        let res = await Request(
          'GET',
          '/api/conversations/' +
            this.props.conversationId.id +
            '?skip=' +
            this.skip
        );
        if (this.mounted)
          this.io.emit('leave', this.state.conversation.customer[0].id);
        if (res && res.data.length > 0) {
          this.setState(
            {
              conversation: res.data[0],
              dataLoading: false,
              notfound: false,
            },
            () => {
              this.io.emit('join', res.data[0].customer[0].id);
              this.props.getConversation(res.data[0]);
            }
          );
        } else
          this.setState({
            dataLoading: false,
          });
      };
      if (this.mounted) fetchData();
    }
    if (this.skip === 0) this.scrollToBottom();
  }
  componentWillUnmount() {
    this.mounted = false;
    this.io.disconnect();
  }

  fetchMessages = async () => {
    if (this.messagesList.scrollTop === 0 && this.skip !== null) {
      this.skip += 10;
      this.setState({ messageListLoading: true });
      let res = await Request(
        'GET',
        '/api/conversations/' +
          this.props.conversationId.id +
          '?skip=' +
          this.skip
      );
      if (res.data.length > 0) {
        let c = this.state.conversation;
        c.messages = [...res.data, ...c.messages];
        this.setState({ conversation: c, messageListLoading: false });
        this.messagesList.scrollTop += 250;
      } else {
        this.skip = null;
        this.setState({ messageListLoading: false });
      }
    }
  };
  render() {
    if (this.state.dataLoading) {
      return (
        <Card
          style={{ marginTop: 4, padding: 0, flex: '29%' }}
          loading={true}
        ></Card>
      );
    }
    if (this.state.notfound) {
      return <Redirect to="/error" />;
    }
    const { messages } = this.state.conversation;
    const customerID = this.state.conversation.customer[0].id;
    let messageList_ = [];
    if (messages.length > 0) {
      messageList_ = messages.map((message) => {
        return (
          <MessageBox
            type={message.type}
            key={message.timestamp}
            left={message.author && message.author.id === customerID}
            timestampFormat="fromNow"
            {...message}
          />
        );
      });
    }
    return (
      <div className="react-chat-container">
        <div className="react-chat-row">
          <div className="react-chat-viewerBox">
            {this.state.messageListLoading ? (
              <Icon
                type="loading"
                spin
                style={{
                  position: 'relative',
                  top: '30px',
                  textAlign: 'center',
                  color: '#1890ff',
                  fontSize: '26px',
                }}
              />
            ) : (
              <Icon
                type="loading"
                spin
                style={{
                  opacity: '0',
                  textAlign: 'center',
                  color: '#1890ff',
                  fontSize: '26px',
                }}
              />
            )}
            <div
              onScroll={this.fetchMessages}
              className="react-chat-messagesList"
              ref={(el) => (this.messagesList = el)}
            >
              <div
                className="react-chat-messagesListContent"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messageList_}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayMessages;
