import React, { Component } from 'react';
import { Card, Divider, Tabs, Skeleton, Result, Icon } from 'antd';
import CardMessage from './CardMessage';
import Filter from './Filter';
import ShowOnlineAgents from './ShowOnlineAgents';
import { Link } from 'react-router-dom';
import { Request } from '../../shared/utils';
import IOClient from 'socket.io-client';
import { authService } from './../../services/authService';

const { TabPane } = Tabs;
class ConversationPanel extends Component {
  state = {
    conversations: [],
    loading: { assigned: false, handoff: false, bot: false },
    checkedTags: [],
    filteredData: [],
    prevConversations: [],
    loadingConversation: false,
    searchLoading: false,
    search: '',
    activeTab: '1',
  };
  componentDidMount() {
    this.skip = 0;
    this.mounted = true;
    this.socket = IOClient(process.env.REACT_APP_API_URL);
    this.socket.emit('join', authService.getCurrentUser().id);
    this.socket.on('addedNewConversation', (newConversation) => {
      if (this.mounted && this.state.activeTab === '1') {
        this.setState({
          conversations: [newConversation, ...this.state.conversations],
        });
      }
    });
    this.socket.on('receivedNewMessage', (data) => {
      let conversations = this.state.conversations;
      conversations.forEach(function (conversation) {
        if (conversation.id === data.id) {
          conversation.lastMessage = data.new_message;
        }
      });
      this.setState({ conversations });
    });
    if (this.mounted) {
      this.setState({ loading: { ...this.state.loading, assigned: true } });
      const fetchData = async () => {
        let res = await Request('GET', '/api/conversations');
        this.setState({
          conversations: res.data,
          prevConversations: res.data,
          loading: { ...this.state.loading, assigned: false },
        });
      };
      fetchData();
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  onChangeTags = (checkedTags) => {
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
    const contains = (arr1) => {
      let arr2 = this.state.checkedTags;
      var tag;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].name) tag = arr1[i].name;
        else tag = arr1[i];
        for (let j = 0; j < arr2.length; j++) {
          if (tag === arr2[j]) return true;
        }
      }
    };
    let newData = this.state.conversations.filter((conversation) => {
      return contains([...conversation.tags, conversation.channel]);
    });
    this.setState({
      prevConversations: this.state.conversations,
      conversations: newData,
    });
  };
  clearFilter = () => {
    this.setState({
      checkedTags: [],
      conversations: this.state.prevConversations,
    });
  };
  fetchData = (activeKey) => {
    this.skip = 0;
    this.setState({
      search: '',
      loadingConversation: false,
    });

    switch (activeKey) {
      case '1':
        this.setState({
          activeTab: '1',
          loading: { ...this.state.loading, assigned: true },
        });
        const fetchAssignedConv = async () => {
          let res = await Request(
            'GET',
            '/api/conversations?skip=' + this.skip
          );
          if (this.state.activeTab === '1') {
            this.setState({
              conversations: res.data,
              loading: { ...this.state.loading, assigned: false },
            });
          }
        };
        fetchAssignedConv();
        break;
      case '2':
        this.setState({
          activeTab: '2',
          loading: { ...this.state.loading, handoff: true },
        });
        const fetchHandOffConv = async () => {
          let res = await Request(
            'GET',
            '/api/conversations/handoff?skip=' + this.skip
          );
          if (this.state.activeTab === '2') {
            this.setState({
              conversations: res.data,
              loading: { ...this.state.loading, handoff: false },
            });
          }
        };
        fetchHandOffConv();
        break;
      case '3':
        this.setState({
          activeTab: '3',
          loading: { ...this.state.loading, bot: true },
        });
        const fetchBotConv = async () => {
          let res = await Request(
            'GET',
            '/api/conversations/bot?skip=' + this.skip
          );
          if (this.state.activeTab === '3') {
            this.setState({
              conversations: res.data,
              loading: { ...this.state.loading, bot: false },
            });
          }
        };
        fetchBotConv();
        break;
      default:
        break;
    }
  };
  handleSearchInputChange = (event) => {
    this.setState({ search: event.target.value });
  };
  handleSearchByInput = async (value) => {
    if (!value) {
      this.setState({
        searchLoading: false,
        activeTab: '1',
        conversations: this.state.prevConversations,
      });
      return;
    }
    this.setState({ searchLoading: true, activeTab: '0' });
    let res = await Request('GET', '/api/conversations?search=' + value);
    this.setState({
      searchLoading: false,
      activeTab: '0',
      conversations: res.data,
    });
  };
  fetchMoreBotConv = async (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.skip !== null &&
      this.state.activeTab === '3'
    ) {
      this.skip += 6;
      this.setState({ loadingConversation: true });
      let res = await Request(
        'GET',
        '/api/conversations/bot?skip=' + this.skip
      );
      if (res.data.length > 0) {
        this.setState({
          conversations: [...this.state.conversations, ...res.data],
          loadingConversation: false,
        });
      } else {
        this.skip = null;
        this.setState({ loadingConversation: false });
      }
    }
  };
  fetchMoreHandoffConv = async (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.state.activeTab === '2' &&
      this.skip !== null
    ) {
      this.skip += 6;
      this.setState({ loadingConversation: true });
      let res = await Request(
        'GET',
        '/api/conversations/handoff?skip=' + this.skip
      );

      if (res.data.length > 0) {
        this.setState({
          conversations: [...this.state.conversations, ...res.data],
          loadingConversation: false,
        });
      } else {
        this.skip = null;
        this.setState({ loadingConversation: false });
      }
    }
  };
  fetchMoreAssignedConv = async (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight &&
      this.state.activeTab === '1' &&
      this.skip !== null
    ) {
      this.skip += 6;
      this.setState({ loadingConversation: true });
      let res = await Request('GET', '/api/conversations?skip=' + this.skip);
      if (this.state.activeTab === '1') {
        if (res.data.length > 0) {
          this.setState({
            conversations: [...this.state.conversations, ...res.data],
            loadingConversation: false,
          });
        } else {
          this.skip = null;
          this.setState({ loadingConversation: false });
        }
      }
    }
  };
  render() {
    let conversations =
      this.state.filteredData.length > 0
        ? this.state.filteredData
        : this.state.conversations;
    return (
      <Card
        style={{
          width: '29%',
          marginTop: 4,
          flex: '1',
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
            <Skeleton
              loading={this.state.loading.assigned}
              paragraph={{ rows: 10 }}
            >
              <div
                onScroll={this.fetchMoreAssignedConv}
                style={{
                  maxHeight: '450px',
                  overflow: 'auto',
                  paddingRight: ' 8px',
                }}
              >
                {conversations.map((conversation) => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      customerAvatar={conversation.customerAvatar}
                      assignedTo={conversation.assigned}
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </div>
              {conversations.length === 0 ? <Result status="404" /> : null}
            </Skeleton>
          </TabPane>
          <TabPane tab="Handoff" key="2">
            <Skeleton
              loading={this.state.loading.handoff}
              paragraph={{ rows: 10 }}
            >
              <div
                onScroll={this.fetchMoreHandoffConv}
                style={{
                  maxHeight: '450px',
                  overflow: 'auto',
                  paddingRight: ' 8px',
                }}
              >
                {conversations.map((conversation) => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      customerAvatar={conversation.customerAvatar}
                      assignedTo={conversation.assigned}
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </div>
              {conversations.length === 0 ? <Result status="404" /> : null}
            </Skeleton>
          </TabPane>
          <TabPane tab="BOT" key="3">
            <Skeleton loading={this.state.loading.bot} paragraph={{ rows: 10 }}>
              <div
                onScroll={this.fetchMoreBotConv}
                style={{
                  maxHeight: '450px',
                  overflow: 'auto',
                  paddingRight: ' 8px',
                }}
              >
                {conversations.map((conversation) => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      customerAvatar={conversation.customerAvatar}
                      assignedTo={conversation.assigned}
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
              </div>
              {conversations.length === 0 ? <Result status="404" /> : null}
            </Skeleton>
          </TabPane>
        </Tabs>
        {this.state.loadingConversation ? (
          <Icon
            type="loading"
            spin
            style={{
              position: 'relative',
              bottom: '-0px',
              textAlign: 'center',
              color: '#1890ff',
              fontSize: '26px',
            }}
          />
        ) : null}
        {this.state.activeTab === '0' && (
          <div
            style={{
              position: 'relative',
              maxHeight: '460px',
              top: '-460px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '98%',
              }}
            >
              <Skeleton loading={this.state.loading.assigned}>
                {conversations.map((conversation) => (
                  <Link
                    to={`/conversations/${conversation.id}`}
                    key={conversation.id}
                  >
                    <CardMessage
                      customerAvatar={conversation.customerAvatar}
                      assignedTo={conversation.assigned}
                      conversationId={conversation.id}
                      lastMessage={conversation.lastMessage}
                      channel={conversation.channel}
                      from={conversation.from}
                    />
                  </Link>
                ))}
                {conversations.length === 0 ? <Result status="404" /> : null}
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
