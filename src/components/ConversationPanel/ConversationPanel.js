import React, { Component } from 'react';
import { Card, Divider, Tabs, Skeleton } from 'antd';
import CardMessage from './CardMessage';
import SearchFilter from './SearchFilter';
import ShowOnlineAgents from './ShowOnlineAgents';
import { Link } from 'react-router-dom';
const data = [
  {
    id: 1234,
    assigned: 1,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    status: 'open'
  },
  {
    id: 1555,
    assigned: 1,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    status: 'open'
  },
  {
    id: 1369,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    status: 'open'
  },
  {
    id: 1874,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    status: 'open'
  },
  {
    id: 3698,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    status: 'open'
  },
  {
    id: 2012,
    from: 'Oussema',
    channel: 'instagram',
    lastMessage: 'I need help! I was going to',
    tags: ['tag4'],
    status: 'closed'
  },
  {
    id: 3874,
    from: 'Oussema',
    channel: 'instagram',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1', 'tag2'],
    status: 'closed'
  }
];
const { TabPane } = Tabs;
class ConversationPanel extends Component {
  state = {
    assignedConversations: [],
    allConversations: data,
    closedConversations: [],
    loading: { assigned: false, all: false, closed: false },
    checkedTags: []
  };
  componentWillMount() {
    let closedConversations = data.filter(c => c.status === 'closed');
    let assignedConversations = data.filter(c => c.assigned === 1);
    this.setState({ closedConversations, assignedConversations });
  }
  handleSearchByInput = () => {
    this.setState({ searchLoading: true });
  };

  onChangeTags = checkedTags => {
    this.setState({ checkedTags });
  };
  clearFilter = () => {
    this.setState({ checkedTags: [] });
    this.setState({ data: this.state.prevData });
  };
  render() {
    return (
      <div style={{ width: '20.5%' }}>
        <Card
          style={{
            width: '100%',
            marginTop: 4,
            height: '100vh'
          }}
        >
          <SearchFilter
            handleSearchByInput={this.handleSearchByInput}
            handleFilter={this.handleFilter}
            clearFilter={this.clearFilter}
            checkedTags={this.state.checkedTags}
            onChangeTags={this.onChangeTags}
            tags={this.props.tags}
            searchLoading={this.state.searchLoading}
          />

          <Divider />

          <Tabs type="card">
            <TabPane tab="Assigned" key="1">
              <Skeleton loading={this.state.loading.assigned}>
                {this.state.assignedConversations.map(conversation => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </Skeleton>
            </TabPane>
            <TabPane tab="All" key="2">
              <Skeleton loading={this.state.loading.all}>
                {this.state.allConversations.map(conversation => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </Skeleton>
            </TabPane>
            <TabPane tab="Closed" key="3">
              <Skeleton loading={this.state.loading.closed}>
                {this.state.closedConversations.map(conversation => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </Skeleton>
            </TabPane>
          </Tabs>
          <Divider />
          <ShowOnlineAgents />
        </Card>
      </div>
    );
  }
}
export default ConversationPanel;
