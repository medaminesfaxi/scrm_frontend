import React from 'react';
import { Card } from 'antd';
import InputBox from './InputBox';
import MessageBox from './MessageBox';
import Header from './Header';
import Footer from './Footer';
import { authService } from '../../services/authService';
import './ChatBox.css';

class ChatBox extends React.Component {
  state = {
    note: false,

    inputText: '',

    macros: {
      greeting: 'Hello and welcome wow omg nice you are here!',
      bye: 'omg no ... see you next time bye!',
      thank: 'thank you so much'
    },

    conversation: {
      assignedTo: 1,
      messages: []
    },
    dataLoading: false,
    border: ''
  };

  handleOnSendMessage = message => {
    if (message.length > 0 && !this.state.note) {
      const currentUser = authService.getCurrentUser();
      this.setState({
        conversation: {
          ...this.state.conversation,
          messages: this.state.conversation.messages.concat({
            author: {
              fullname: currentUser.fullname,
              id: currentUser.id,
              avatarUrl: currentUser.avatarSrc
            },
            text: message,
            timestamp: +new Date(),
            type: 'text'
          })
        },
        inputText: '',
        border: '2px solid #ccc'
      });
    }
    if (this.state.note) {
      this.props.AddNewNote(message);
      this.setState({ inputText: '', border: '2px solid #ccc', note: false });
    }
  };

  handleOnChange = e => {
    this.setState({ inputText: e.target.value });
  };

  strip = str => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  handleOnClick = e => {
    let str = this.strip(this.state.inputText);
    if (str.length) {
      this.handleOnSendMessage(str);
    }
  };

  onKeyPress = e => {
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
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  addNote = () => {
    this.setState({ note: true, border: '2px solid #FFA800' });
    this.childRef.focus();
  };
  useMacro = value => {
    this.setState({ inputText: this.state.macros[value], selectedMacro: '' });
  };
  setRef = input => {
    this.childRef = input;
  };

  takeoverChat = () => {
    this.setState({
      conversation: { ...this.state.conversation, assignedTo: 1 }
    });
  };

  render() {
    const taken =
      this.state.conversation.assignedTo !== 1 &&
      this.state.conversation.assignedTo !== 999;
    const isBot = this.state.conversation.assignedTo === 999;

    const { placeholder } = this.props;
    const userId = 1;
    const { messages } = this.state.conversation;

    const messageList = messages.map((message, idx) => {
      return (
        <MessageBox
          key={idx}
          left={message.author && message.author.id !== userId}
          timestampFormat="fromNow"
          {...message}
        />
      );
    });

    return (
      <Card
        style={{ marginTop: 4, padding: 0, flex: '29%' }}
        loading={this.state.dataLoading}
      >
        <Header taken={isBot} takeoverChat={this.takeoverChat} />
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
              {isBot ? null : (
                <>
                  <Footer
                    selectedMacro={this.selectedMacro}
                    macros={this.state.macros}
                    useMacro={this.useMacro}
                    tags={this.props.tags}
                    addNote={this.addNote}
                    disabled={!taken}
                  />
                  <InputBox
                    border={this.state.border}
                    setRef={this.setRef}
                    inputText={this.state.inputText}
                    handleOnClick={this.handleOnClick}
                    onKeyPress={this.onKeyPress}
                    handleOnChange={this.handleOnChange}
                    taken={taken}
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

export default ChatBox;
