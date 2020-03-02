import React, { Component } from 'react';
import CustomerDetails from '../components/CustomerDetails';
import ConversationPanel from './../components/ConversationPanel/ConversationPanel';
import ChatBox from './../components/ChatBox/ChatBox';
import NoConversation from './../components/NoConversation';
const tags = ['tag1', 'tag2', 'tag3'];
export default class Conversations extends Component {
  render() {
    return (
      <main>
        <ConversationPanel tags={tags} />
        {this.props.match.params.id ? (
          <ChatBox conversationId={this.props.match.params.id} tags={tags} />
        ) : (
          <NoConversation />
        )}
        <CustomerDetails />
      </main>
    );
  }
}
