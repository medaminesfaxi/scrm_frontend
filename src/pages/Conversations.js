import React, { Component } from 'react';
import CustomerDetails from '../components/CustomerDetails';
import ConversationPanel from './../components/ConversationPanel/ConversationPanel';
import ChatBox from './../components/ChatBox/ChatBox';
import NoConversation from './../components/NoConversation';
import Notes from '../components/Notes';
import { Request } from '../shared/utils';
import DisplayMessages from './../components/ChatBox/DisplayMessages';
import Header from './../components/ChatBox/Header';
import { Card } from 'antd';
import { authService } from './../services/authService';
export default class Conversations extends Component {
  state = {
    details: [{}],
    assignedTo: '',
    conversation: [],
    loading: false,
    notes: [],
    tags: [],
    channels: ['instagram', 'facebook'],
  };
  componentDidMount() {
    this.mounted = true;
    const fetchTags = async () => {
      let res = await Request('GET', '/api/tags');
      let t = [];
      for (let i = 0; i < res.data.length; i++) {
        t.push(res.data[i].name);
      }
      if (this.mounted) this.setState({ tags: t });
    };
    fetchTags();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  AddNewNote = async (note) => {
    let res = await Request(
      'PUT',
      '/api/conversations/addNote/' + this.props.match.params.id,
      {
        text: note,
      }
    );
    this.setState({
      notes: [...this.state.notes, { _id: res.data._id, text: note }],
    });
  };
  deleteNote = async (id) => {
    this.setState({ loading: true });
    await Request(
      'PUT',
      '/api/conversations/deleteNote/' + this.props.match.params.id,
      {
        _id: id,
      }
    );
    let newNotes = this.state.notes.filter((note) => note._id !== id);
    this.setState({ notes: newNotes, loading: false });
  };
  getConversation = (conversation) => {
    this.setState({
      conversation,
      notes: conversation.notes,
      assignedTo: conversation.assignedTo,
      details: conversation.customer,
    });
  };
  render() {
    const userId = authService.getCurrentUser().id;
    const taken = this.state.assignedTo !== userId;
    const isBot = this.state.assignedTo === '999';
    return (
      <main style={{ maxHeight: '100vh' }}>
        <ConversationPanel
          tags={this.state.tags}
          channels={this.state.channels}
        />
        {this.props.match.params.id ? (
          <>
            <Card style={{ marginTop: 4, padding: 0, flex: '29%' }}>
              <Header
                conversationId={this.props.match.params}
                taken={taken}
                isBot={isBot}
              />
              <DisplayMessages
                conversationId={this.props.match.params}
                getConversation={this.getConversation}
              />
              <ChatBox
                taken={taken}
                isBot={isBot}
                AddNewNote={this.AddNewNote}
                conversationId={this.props.match.params}
                tags={this.state.conversation.tags}
                notes={this.state.notes}
              />
            </Card>
            <div
              style={{
                marginTop: '4px',
                flex: '1',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'stretch',
              }}
            >
              <CustomerDetails details={this.state.details} />
              <Notes
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                loading={this.state.loading}
              />
            </div>
          </>
        ) : (
          <NoConversation />
        )}
      </main>
    );
  }
}
