import React from 'react';
import InputBox from './InputBox';
import Footer from './Footer';
import { authService } from '../../services/authService';
import { Request } from '../../shared/utils';
import './ChatBox.css';
import { Redirect } from 'react-router-dom';

class ChatBox extends React.PureComponent {
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
  handleOnSendMessage = async (message, type) => {
    if (message.length > 0 && !this.state.note && !this.state.loading) {
      const currentUser = authService.getCurrentUser();
      const msg = {
        author: {
          fullname: currentUser.fullname,
          id: currentUser.id,
          avatarUrl: currentUser.avatarSrc,
        },
        text: message,
        type: type,
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
      this.handleOnSendMessage(str, 'text');
    }
  };

  onKeyPress = (e) => {
    if (e.shiftKey && e.charCode === 13) {
      let str = this.strip(this.state.inputText);
      if (str.length) {
        this.handleOnSendMessage(str, 'text');
      }
      e.preventDefault();
      return false;
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

  render() {
    if (this.state.notfound) {
      return <Redirect to="/error" />;
    } else {
      const { placeholder, isBot, taken } = this.props;
      return isBot || taken ? null : (
        <>
          <Footer
            handleOnSendMessage={this.handleOnSendMessage}
            conversationId={this.props.conversationId.id}
            selectedMacro={this.selectedMacro}
            macros={this.state.macros}
            useMacro={this.useMacro}
            tags={this.props.tags}
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
      );
    }
  }
}
export default ChatBox;
