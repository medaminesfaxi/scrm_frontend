import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
export default function ConversationNotFound() {
  return (
    <Result
      style={{ marginTop: 4, padding: 0, flex: '29%' }}
      status="404"
      title="404"
      subTitle="Sorry, there is no conversation to show."
      extra={
        <Button type="primary">
          <Link to="/conversations">Back to conversations</Link>
        </Button>
      }
    />
  );
}
