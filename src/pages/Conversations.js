import React, { Component } from 'react';
import CustomerDetails from '../components/CustomerDetails';
import ConversationPanel from './../components/ConversationPanel/ConversationPanel';
import ChatBox from './../components/ChatBox/ChatBox';

export default class Conversations extends Component {
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
    ]
  };

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
    return (
      <main>
        <ConversationPanel />
        <ChatBox
          messages={this.state.messages}
          userId={1}
          onSendMessage={this.handleOnSendMessage}
        />
        <CustomerDetails />
      </main>
    );
  }
}
