import React, { Component } from 'react';
import CustomerDetails from '../components/CustomerDetails';
import ConversationPanel from './../components/ConversationPanel/ConversationPanel';
import ChatBox from './../components/ChatBox/ChatBox';
import NoConversation from './../components/NoConversation';
import Notes from '../components/Notes';
export default class Conversations extends Component {
  state = {
    notes: [
      { id: 1, text: 'this is a note number 1' },
      { id: 2, text: 'this is a note number 2' }
    ],
    tags: ['tag1', 'tag2', 'tag3'],
    channels: ['instagram', 'facebook']
  };
  AddNewNote = message => {
    let note = { id: 6, text: message };
    this.setState({ notes: [...this.state.notes, note] });
  };
  deleteNote = id => {
    let newNotes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes: newNotes });
  };
  render() {
    return (
      <main>
        <ConversationPanel
          tags={this.state.tags}
          channels={this.state.channels}
        />
        {this.props.match.params.id ? (
          <>
            <ChatBox
              AddNewNote={this.AddNewNote}
              conversationId={this.props.match.params.id}
              tags={this.state.tags}
              notes={this.state.notes}
            />
            <div style={{ marginTop: '4px', flex: '1' }}>
              <CustomerDetails />
              <Notes notes={this.state.notes} deleteNote={this.deleteNote} />
            </div>
          </>
        ) : (
          <NoConversation />
        )}
      </main>
    );
  }
}
