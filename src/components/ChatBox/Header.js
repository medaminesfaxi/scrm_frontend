import React, { Component } from 'react';
import { Select, Divider, Button } from 'antd';
import { authService } from '../../services/authService';

const { Option } = Select;
export default class Header extends Component {
  state = {
    loading: false
  };
  onChangeAssignSelection = value => {
    console.log(`selected ${value}`);
  };
  resolveConversation = () => {};

  render() {
    if (!this.props.taken) {
      const admin = authService.getCurrentUser().is_admin;
      return (
        <>
          <div
            style={{
              padding: '12px',
              background: '#fff'
            }}
          >
            {admin && (
              <Select
                style={{ width: 200 }}
                placeholder="Assign to"
                onChange={this.onChangeAssignSelection}
              >
                <Option value="mohamed">Mohamed</Option>
                <Option value="jawher">Jawher</Option>
                <Option value="moncef">Moncef</Option>
              </Select>
            )}
            <Button
              onClick={this.resolveConversation}
              type="primary"
              shape="round"
              style={{ float: 'right', background: '#5553B7' }}
              loading={this.state.loading}
            >
              Resolve conversation
            </Button>
          </div>
          <Divider />
        </>
      );
    } else
      return (
        <Button type="primary" size="large" onClick={this.props.takeoverChat}>
          Assign to me
        </Button>
      );
  }
}
