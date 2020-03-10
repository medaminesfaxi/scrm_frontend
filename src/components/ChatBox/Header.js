import React, { Component } from 'react';
import { Select, Divider, Button } from 'antd';

const { Option } = Select;
export default class Header extends Component {
  onChangeAssignSelection = value => {
    console.log(`selected ${value}`);
  };
  onChangeStatusSelection = value => {
    console.log(`selected ${value}`);
  };

  render() {
    if (!this.props.taken)
      return (
        <div
          style={{
            padding: '12px',
            background: '#fff'
          }}
        >
          <Select
            style={{ width: 200 }}
            placeholder="Assign to"
            onChange={this.onChangeAssignSelection}
          >
            <Option value="mohamed">Mohamed</Option>
            <Option value="jawher">Jawher</Option>
            <Option value="moncef">Moncef</Option>
          </Select>
          <span style={{ margin: '0 16px' }}>Status:</span>
          <Select
            defaultValue={'open'}
            style={{ width: 200 }}
            placeholder="Status"
            onChange={this.onChangeStatusSelection}
          >
            <Option value="open">Open</Option>
            <Option value="closed">Closed</Option>
          </Select>
          <Divider />
        </div>
      );
    else
      return (
        <Button type="primary" size="large" onClick={this.props.takeoverChat}>
          Assign to me
        </Button>
      );
  }
}
