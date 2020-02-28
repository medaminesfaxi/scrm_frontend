import React, { Component } from 'react';
import { Card, Divider, Tabs } from 'antd';
import CardMessage from './CardMessage';
import SearchFilter from './SearchFilter';

const { TabPane } = Tabs;
class ConversationPanel extends Component {
  state = {
    data: [
      {
        id: 1,
        assigned_to: 1,
        from: 'Oussema',
        channel: 'facebook',
        lastMessage: 'I need help! I was going to',
        tags: ['tag1']
      },
      {
        id: 2,
        assigned_to: 1,
        from: 'Oussema',
        channel: 'instagram',
        lastMessage: 'I need help! I was going to',
        tags: ['tag4']
      },
      {
        id: 3,
        assigned_to: 1,
        from: 'Oussema',
        channel: 'instagram',
        lastMessage: 'I need help! I was going to',
        tags: ['tag1', 'tag2']
      }
    ],
    prevData: [],
    dataLoading: false,
    searchLoading: false,
    checkedTags: [],
    tags: ['tag1', 'tag2', 'tag3']
  };
  componentDidMount() {
    this.setState({ prevData: this.state.data });
  }
  handleSearchByInput = () => {
    this.setState({ searchLoading: true });
  };

  handleFilter = () => {
    if (this.state.checkedTags.length === 0 || this.state.data.length === 0) {
      this.setState({ data: this.state.prevData });
      return;
    }
    const contains = arr1 => {
      let arr2 = this.state.checkedTags;
      console.log(arr2);
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i] === arr2[j]) return true;
        }
      }
      return false;
    };

    let newData = [...this.state.prevData];
    newData = newData.filter(conversation => {
      return contains(conversation.tags);
    });
    this.setState({ data: newData });
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
      <div style={{ width: '20%' }}>
        <Card
          style={{ width: '100%', marginTop: 4, height: '100vh' }}
          loading={this.state.dataLoading}
        >
          <SearchFilter
            handleSearchByInput={this.handleSearchByInput}
            handleFilter={this.handleFilter}
            clearFilter={this.clearFilter}
            checkedTags={this.state.checkedTags}
            onChangeTags={this.onChangeTags}
            tags={this.state.tags}
            searchLoading={this.state.searchLoading}
          />

          <Divider />

          <Tabs type="card">
            <TabPane tab="Assigned" key="1">
              {this.state.data.map((conversation, index) => (
                <CardMessage
                  key={index}
                  lastMessage={conversation.lastMessage}
                  channel={conversation.channel}
                  from={conversation.from}
                />
              ))}
            </TabPane>
            <TabPane tab="All" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Closed" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
export default ConversationPanel;
