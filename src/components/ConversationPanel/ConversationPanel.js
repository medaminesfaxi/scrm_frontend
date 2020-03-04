import React, { Component } from 'react';
import { Card, Divider, Tabs, Skeleton } from 'antd';
import CardMessage from './CardMessage';
import Filter from './Filter';
import ShowOnlineAgents from './ShowOnlineAgents';
import { Link } from 'react-router-dom';
const data = [
  {
    id: 1234,
    assigned: 1,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag2'],
    open: 'open'
  },
  {
    id: 1555,
    assigned: 1,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    open: 'open'
  },
  {
    id: 1369,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    open: 'open'
  },
  {
    id: 1874,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    open: 'open'
  },
  {
    id: 3698,
    from: 'Oussema',
    channel: 'facebook',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1'],
    open: 'open'
  },
  {
    id: 2012,
    from: 'Oussema',
    channel: 'instagram',
    lastMessage: 'I need help! I was going to',
    tags: ['tag4'],
    open: false
  },
  {
    id: 3874,
    from: 'Oussema',
    channel: 'instagram',
    lastMessage: 'I need help! I was going to',
    tags: ['tag1', 'tag3'],
    open: false
  }
];
const { TabPane } = Tabs;
class ConversationPanel extends Component {
  state = {
    assignedConversations: [],
    allConversations: data,
    closedConversations: [],
    loading: { assigned: false, all: false, closed: false },
    checkedTags: [],
    filteredData: []
  };
  componentDidMount() {
    let closedConversations = this.state.allConversations.filter(
      c => c.open === false
    );
    let assignedConversations = this.state.allConversations.filter(
      c => c.assigned === 1
    );
    this.setState({ closedConversations, assignedConversations });
  }

  onChangeTags = checkedTags => {
    this.setState({ checkedTags });
  };
  handleFilter = () => {
    if (
      this.state.checkedTags.length === 0 ||
      this.state.allConversations.length === 0
    ) {
      this.setState({ filteredData: [] });
      return;
    }
    const contains = arr1 => {
      let arr2 = this.state.checkedTags;
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i] === arr2[j]) return true;
        }
      }
    };
    let newData = this.state.allConversations.filter(conversation => {
      return contains(conversation.tags);
    });
    let closedConversations = newData.filter(c => c.open === false);
    let assignedConversations = newData.filter(c => c.assigned === 1);
    this.setState({
      filteredData: newData,
      closedConversations,
      assignedConversations
    });
  };
  clearFilter = () => {
    let closedConversations = this.state.allConversations.filter(
      c => c.open === false
    );
    let assignedConversations = this.state.allConversations.filter(
      c => c.assigned === 1
    );
    this.setState({
      closedConversations,
      assignedConversations,
      checkedTags: [],
      filteredData: []
    });
  };
  render() {
    let allConversations =
      this.state.filteredData.length > 0
        ? this.state.filteredData
        : this.state.allConversations;
    return (
      <Card
        style={{
          marginTop: 4,
          flex: '1'
        }}
      >
        <Filter
          handleFilter={this.handleFilter}
          clearFilter={this.clearFilter}
          checkedTags={this.state.checkedTags}
          onChangeTags={this.onChangeTags}
          tags={this.props.tags}
        />

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
              {allConversations.map(conversation => (
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
    );
  }
}
export default ConversationPanel;
