import React, { Component } from 'react';
import { Result, Card } from 'antd';
export default class NoConversation extends Component {
  render() {
    return (
      <Card
        style={{
          marginTop: 4,
          padding: 0,
          flex: '52.5%',
        }}
      >
        <Result title="You did not select any conversation yet!" />
      </Card>
    );
  }
}
