import React from 'react';
import { Card, Icon } from 'antd';
import InputBox from './InputBox';
import MessageBox from './MessageBox';
import Header from './Header';
import Footer from './Footer';
import { authService } from '../../services/authService';
import { Request } from '../../shared/utils';
import './ChatBox.css';
import IOClient from 'socket.io-client';
import { Redirect } from 'react-router-dom';

class ChatBox extends React.Component {
  state = {
    note: false,
    notfound: false,
    inputText: '',
    messageListLoading: false,
    conversation: { messages: [] },
    dataLoading: true,
    loading: false,
    border: '',
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
            type: 'text',
          }),
        },
      });
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
              this.props.getNotes(res.data[0].notes);
              this.props.getCustomerDetails(res.data[0].customer);
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
  componentDidUpdate() {
    this.newConversationID = this.props.conversationId.id;
    if (this.newConversationID !== this.OldconversationID) {
      this.OldconversationID = this.newConversationID;
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
              this.props.getNotes(res.data[0].notes);
              this.props.getCustomerDetails(res.data[0].customer);
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
  handleOnSendMessage = async (message) => {
    if (message.length > 0 && !this.state.note && !this.state.loading) {
      const currentUser = authService.getCurrentUser();
      const msg = {
        author: {
          fullname: currentUser.fullname,
          id: currentUser.id,
          avatarUrl: currentUser.avatarSrc,
        },
        text: message,
        timestamp: +new Date(),
      };
      this.setState({ loading: true });
      await Request(
        'POST',
        '/api/conversations/messages/' + this.props.conversationId.id,
        { message: msg }
      );
      this.setState({
        loading: false,
        inputText: '',
        border: '2px solid #ccc',
      });
    }
    if (this.state.note && !this.state.loading) {
      this.setState({ loading: true });
      await this.props.AddNewNote(message);
      this.setState({
        inputText: '',
        border: '2px solid #ccc',
        note: false,
        loading: false,
      });
    }
    this.scrollToBottom();
  };

  handleOnChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  strip = (str) => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  handleOnClick = (e) => {
    let str = this.strip(this.state.inputText);
    if (str.length) {
      this.handleOnSendMessage(str);
    }
  };

  onKeyPress = (e) => {
    if (e.shiftKey && e.charCode === 13) {
      let str = this.strip(this.state.inputText);
      if (str.length) {
        this.handleOnSendMessage(str);
      }
      e.preventDefault();
      return false;
    }
  };

  scrollToBottom = () => {
    if (this.messagesList) {
      this.messagesList.scrollTop =
        this.messagesList.scrollHeight - this.messagesList.clientHeight;
    }
  };

  addNote = () => {
    this.setState({ note: true, border: '2px solid #FFA800' });
    this.childRef.focus();
  };
  useMacro = (value) => {
    this.setState({ inputText: value, selectedMacro: '' });
  };
  setRef = (input) => {
    this.childRef = input;
  };

  takeoverChat = async () => {
    let res = await Request(
      'PUT',
      '/api/conversations/takeover/' + this.props.conversationId.id,
      {
        id: authService.getCurrentUser().id,
      }
    );
    if (res.status === 200) window.location = '/conversations';
  };
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
        this.messagesList.scrollTop += 500;
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
    } else {
      const userId = authService.getCurrentUser().id;
      const customerID = this.state.conversation.customer[0].id;

      const taken = this.state.conversation.assignedTo !== userId;
      const isBot = this.state.conversation.assignedTo === '999';

      const { placeholder } = this.props;
      const { messages } = this.state.conversation;
      let messageList = [];
      if (messages.length > 0) {
        messageList = messages.map((message, idx) => {
          return (
            <MessageBox
              type="text"
              key={idx}
              left={message.author && message.author.id === customerID}
              timestampFormat="fromNow"
              {...message}
            />
          );
        });
      }
      return (
        <Card style={{ marginTop: 4, padding: 0, flex: '29%' }} loading={false}>
          <Header
            isBot={isBot}
            taken={taken}
            takeoverChat={this.takeoverChat}
            conversationId={this.props.conversationId.id}
          />
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
                ) : null}
                <div
                  onScroll={this.fetchMessages}
                  className="react-chat-messagesList"
                  ref={(el) => (this.messagesList = el)}
                >
                  <div className="react-chat-messagesListContent">
                    {messageList}
                  </div>
                </div>
                {isBot || taken ? null : (
                  <>
                    <Footer
                      conversationId={this.props.conversationId.id}
                      selectedMacro={this.selectedMacro}
                      macros={this.state.macros}
                      useMacro={this.useMacro}
                      tags={this.state.conversation.tags}
                      addNote={this.addNote}
                    />
                    <InputBox
                      loading={this.state.loading}
                      border={this.state.border}
                      setRef={this.setRef}
                      inputText={this.state.inputText}
                      handleOnClick={this.handleOnClick}
                      onKeyPress={this.onKeyPress}
                      handleOnChange={this.handleOnChange}
                      placeholder={placeholder}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      );
    }
  }
}
export default ChatBox;
