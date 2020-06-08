import React, { Component } from 'react';
import CustomerDetails from '../components/CustomerDetails';
import ConversationPanel from './../components/ConversationPanel/ConversationPanel';
import ChatBox from './../components/ChatBox/ChatBox';
import NoConversation from './../components/NoConversation';
import Notes from '../components/Notes';
import { Request } from '../shared/utils';
export default class Conversations extends Component {
  state = {
    details: [{}],
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
  getNotes = (notes) => {
    this.setState({ notes: notes });
  };
  getCustomerDetails = (details) => {
    this.setState({ details });
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
              getCustomerDetails={this.getCustomerDetails}
              getNotes={this.getNotes}
              AddNewNote={this.AddNewNote}
              conversationId={this.props.match.params}
              tags={this.state.tags}
              notes={this.state.notes}
            />
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
