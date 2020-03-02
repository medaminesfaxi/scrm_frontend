import React from 'react';
import { Card } from 'antd';
import InputBox from './InputBox';
import MessageBox from './MessageBox';
import './ChatBox.css';
import Header from './Header';
import Footer from './Footer';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleOnSendMessage = this.handleOnSendMessage.bind(this);
  }

  state = {
    messages: [
      {
        text:
          'This is a note yey yey eyyeyeyeyeyeyeyeyeyeyyeyeyeyeyeyeyeyeyyeyeyeyeyeyeyeyeye',
        timestamp: 1578366389250,
        type: 'note'
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg'
        },
        text: 'Hi',
        type: 'text',
        timestamp: 1578366393250
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg'
        },
        text: "What's up?",
        type: 'text',
        timestamp: 1578366425250
      }
    ],
    dataLoading: false
  };

  scrollToBottom() {
    if (this.messagesList) {
      this.messagesList.scrollTop =
        this.messagesList.scrollHeight - this.messagesList.clientHeight;
    }
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleOnSendMessage = message => {
    this.setState({
      messages: this.state.messages.concat({
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg'
        },
        text: message,
        timestamp: +new Date(),
        type: 'text'
      })
    });
  };
  render() {
    const { disableInput, disabledInputPlaceholder, placeholder } = this.props;
    const userId = 1;
    const { messages } = this.state;

    const messageList = messages.map((message, idx) => {
      return (
        <MessageBox
          key={idx}
          left={message.author && message.author.id !== userId}
          timestampFormat="calendar"
          {...message}
        />
      );
    });

    return (
      <div style={{ width: '58%' }}>
        <Card
          style={{ width: '100%', marginTop: 4, height: '100vh', padding: 0 }}
          loading={this.state.dataLoading}
        >
          <Header />
          <div className="react-chat-container">
            <div className="react-chat-row">
              <div className="react-chat-viewerBox">
                <div
                  className="react-chat-messagesList"
                  ref={el => (this.messagesList = el)}
                >
                  <div className="react-chat-messagesListContent">
                    {messageList}
                  </div>
                </div>
                <Footer tags={this.props.tags} />
                <InputBox
                  onSendMessage={this.handleOnSendMessage}
                  disabled={disableInput}
                  placeholder={placeholder}
                  disabledInputPlaceholder={disabledInputPlaceholder}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default ChatBox;
