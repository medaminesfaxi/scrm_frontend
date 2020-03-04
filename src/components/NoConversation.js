import React, { Component } from 'react';
import { Result, Icon, Card } from 'antd';
export default class NoConversation extends Component {
  render() {
    return (
      <Card style={{ marginTop: 4, padding: 0, flex: '29%' }}>
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          title="You did not select any conversation yet!"
        />
      </Card>
    );
  }
}
