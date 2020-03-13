import React, { Component } from 'react';
import { Card, Divider, Tabs, Skeleton } from 'antd';
import CardMessage from './CardMessage';
import Filter from './Filter';
import ShowOnlineAgents from './ShowOnlineAgents';
import { Link } from 'react-router-dom';
import { assigned, handoff, bot } from './fakeConversations';

const { TabPane } = Tabs;
class ConversationPanel extends Component {
  state = {
    conversations: [],
    loading: { assigned: false, handoff: false, bot: false },
    checkedTags: [],
    filteredData: [],
    searchLoading: false,
    search: '',
    activeTab: '1'
  };
  componentDidMount() {
    this.setState({ conversations: assigned });
  }
  onChangeTags = checkedTags => {
    this.setState({ checkedTags });
  };
  handleFilter = () => {
    if (
      this.state.checkedTags.length === 0 ||
      this.state.conversations.length === 0
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
    let newData = this.state.conversations.filter(conversation => {
      return contains([...conversation.tags, conversation.channel]);
    });
    this.setState({
      filteredData: newData
    });
  };
  clearFilter = () => {
    this.setState({
      checkedTags: [],
      filteredData: []
    });
  };
  fetchData = activeKey => {
    this.setState({ search: '' });
    switch (activeKey) {
      case '1':
        this.setState({ conversations: assigned, activeTab: '1' });
        break;
      case '2':
        this.setState({ conversations: handoff, activeTab: '2' });
        break;
      case '3':
        this.setState({ conversations: bot, activeTab: '3' });
        break;
      default:
        break;
    }
  };
  handleSearchInputChange = event => {
    this.setState({ search: event.target.value });
  };
  handleSearchByInput = value => {
    if (!value) {
      this.setState({ searchLoading: false, activeTab: '1' });
      return;
    }
    this.setState({ searchLoading: false, activeTab: '0' });
  };
  render() {
    let conversations =
      this.state.filteredData.length > 0
        ? this.state.filteredData
        : this.state.conversations;
    return (
      <Card
        style={{
          marginTop: 4,
          flex: '1'
        }}
      >
        <Filter
          search={this.state.search}
          searchLoading={this.state.searchLoading}
          handleSearchByInput={this.handleSearchByInput}
          handleSearchInputChange={this.handleSearchInputChange}
          handleFilter={this.handleFilter}
          clearFilter={this.clearFilter}
          checkedTags={this.state.checkedTags}
          onChangeTags={this.onChangeTags}
          tags={[...this.props.tags, ...this.props.channels]}
        />

        <Tabs
          type="card"
          onChange={this.fetchData}
          activeKey={this.state.activeTab}
        >
          <TabPane tab="Assigned" key="1">
            <Skeleton loading={this.state.loading.assigned}>
              {conversations.map(conversation => (
                <Link
                  to={`/conversations/${conversation.id}`}
                  key={conversation.id}
                >
                  <CardMessage
                    assignedTo={conversation.assigned}
                    conversationId={conversation.id}
                    lastMessage={conversation.lastMessage}
                    channel={conversation.channel}
                    from={conversation.from}
                  />
                </Link>
              ))}
            </Skeleton>
          </TabPane>
          <TabPane tab="Handoff" key="2">
            <Skeleton loading={this.state.loading.handoff}>
              {conversations.map(conversation => (
                <Link
                  to={`/conversations/${conversation.id}`}
                  key={conversation.id}
                >
                  <CardMessage
                    assignedTo={conversation.assigned}
                    conversationId={conversation.id}
                    lastMessage={conversation.lastMessage}
                    channel={conversation.channel}
                    from={conversation.from}
                  />
                </Link>
              ))}
            </Skeleton>
          </TabPane>
          <TabPane tab="BOT" key="3">
            <Skeleton loading={this.state.loading.bot}>
              {conversations.map(conversation => (
                <Link
                  to={`/conversations/${conversation.id}`}
                  key={conversation.id}
                >
                  <CardMessage
                    assignedTo={conversation.assigned}
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
        {this.state.activeTab === '0' && (
          <div
            style={{
              position: 'relative',
              maxHeight: '460px',
              top: '-460px'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '98%'
              }}
            >
              <Skeleton loading={this.state.loading.assigned}>
                {conversations.map(conversation => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      assignedTo={conversation.assigned}
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </Skeleton>
            </div>
          </div>
        )}
        <Divider />
        <ShowOnlineAgents />
      </Card>
    );
  }
}
export default ConversationPanel;
