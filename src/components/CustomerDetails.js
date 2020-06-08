import React from 'react';
import { Card, Avatar, Icon } from 'antd';
import styles from '../pages/styles.module.css';

const { Meta } = Card;

class CustomerDetails extends React.Component {
  state = {
    imageIsReady: false,
    src: '',
  };
  componentDidUpdate() {
    if (this.props.details[0].avatarSrc && this.state.src === '') {
      const img = new Image();
      img.src = this.props.details[0].avatarSrc;
      img.onload = () => {
        this.setState({
          imageIsReady: true,
          src: this.props.details[0].avatarSrc,
        });
      };
    }
  }

  render() {
    return (
      <Card
        style={{ height: '50%' }}
        cover={
          <>
            <div className={styles.banner__card}>
              <h1>Customer Details</h1>
              {this.state.imageIsReady ? (
                <Avatar
                  size={86}
                  src={this.props.details[0].avatarSrc}
                  icon="user"
                  style={{ position: 'absolute', top: '115px' }}
                />
              ) : (
                <Icon
                  type="loading"
                  spin
                  style={{
                    position: 'absolute',
                    top: '115px',
                    color: '#1890ff',
                    fontSize: '26px',
                  }}
                />
              )}
            </div>
          </>
        }
      >
        <Meta title={this.props.details[0].fullname} />
      </Card>
    );
  }
}
export default CustomerDetails;
