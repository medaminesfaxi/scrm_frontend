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
    inputText: '',
    open: true,
    macros: {
      greeting: 'Hello and welcome wow omg nice you are here!',
      bye: 'omg no ... see you next time bye!',
      thank: 'thank you so much'
    },
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
          avatarUrl:
            'https://scontent.ftun11-1.fna.fbcdn.net/v/t1.0-9/56196777_2370263756337563_5897750826310434816_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=l-JoEUse1d4AX-GM_Gm&_nc_ht=scontent.ftun11-1.fna&oh=828cc2709b0c837cd67159c0f60467f0&oe=5EF36B5E'
        },
        text: 'Hi',
        type: 'text',
        timestamp: 1578366393250
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl:
            'https://scontent.ftun11-1.fna.fbcdn.net/v/t1.0-9/56196777_2370263756337563_5897750826310434816_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=l-JoEUse1d4AX-GM_Gm&_nc_ht=scontent.ftun11-1.fna&oh=828cc2709b0c837cd67159c0f60467f0&oe=5EF36B5E'
        },
        text: "What's up?",
        type: 'text',
        timestamp: 1578366425250
      }
    ],
    dataLoading: false,
    border: ''
  };

  handleOnSendMessage = message => {
    let t = message.substr(0, 5).toLowerCase() === '!note' ? 'note' : 'text';
    let m = t === 'note' ? message.substring(6, message.length) : message;
    if (m.length > 0)
      this.setState({
        messages: this.state.messages.concat({
          author: {
            username: 'user1',
            id: 1,
            avatarUrl:
              'https://scontent.ftun11-1.fna.fbcdn.net/v/t1.0-9/56196777_2370263756337563_5897750826310434816_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=l-JoEUse1d4AX-GM_Gm&_nc_ht=scontent.ftun11-1.fna&oh=828cc2709b0c837cd67159c0f60467f0&oe=5EF36B5E'
          },
          text: m,
          timestamp: +new Date(),
          type: t
        }),
        inputText: '',
        border: '2px solid #ccc'
      });
  };

  handleOnChange = e => {
    if (e.target.value.substr(0, 5).toLowerCase() === '!note') {
      this.setState({ border: '2px solid #FFA800' });
    } else {
      this.setState({ border: '2px solid #ccc' });
    }
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
  addNote = () => {
    this.setState({ inputText: '!note ', border: '2px solid #FFA800' });
    this.childRef.focus();
  };
  useMacro = value => {
    this.setState({ inputText: this.state.macros[value], selectedMacro: '' });
  };
  setRef = input => {
    this.childRef = input;
  };

  render() {
    const { placeholder } = this.props;
    const userId = 1;
    const { messages } = this.state;

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
        <Header open={this.state.open} />
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
              <Footer
                selectedMacro={this.selectedMacro}
                macros={this.state.macros}
                useMacro={this.useMacro}
                tags={this.props.tags}
                addNote={this.addNote}
                disabled={this.state.open}
              />
              <InputBox
                border={this.state.border}
                setRef={this.setRef}
                inputText={this.state.inputText}
                handleOnClick={this.handleOnClick}
                onKeyPress={this.onKeyPress}
                handleOnChange={this.handleOnChange}
                disabled={!this.state.open}
                placeholder={placeholder}
                disabledInputPlaceholder={!this.state.open}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ChatBox;
