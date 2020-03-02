import React, { Component } from 'react';
import { Result, Icon, Card } from 'antd';
export default class NoConversation extends Component {
  render() {
    return (
      <div style={{ width: '58%' }}>
        <Card
          style={{ width: '100%', marginTop: 4, height: '100vh', padding: 0 }}
        >
          <Result
            icon={<Icon type="smile" theme="twoTone" />}
            title="You did not select any conversation yet!"
          />
        </Card>
      </div>
    );
  }
}
