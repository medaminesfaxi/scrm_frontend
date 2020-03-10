import React from 'react';
import { Card, Avatar } from 'antd';
import styles from '../pages/styles.module.css';

const { Meta } = Card;

class CustomerDetails extends React.Component {
  state = {
    loading: false
  };

  render() {
    const { loading } = this.state;
    return (
      <Card
        style={{ height: '50%' }}
        loading={loading}
        cover={
          <>
            <div className={styles.banner__card}>
              <h1>Customer Details</h1>
              <Avatar
                size={86}
                icon="user"
                style={{ position: 'absolute', top: '115px' }}
              />
            </div>
          </>
        }
      >
        <Meta title="username" description="This is the description" />
      </Card>
    );
  }
}
export default CustomerDetails;
