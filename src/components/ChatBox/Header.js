import React, { Component } from 'react';
import { Select, Divider } from 'antd';

const { Option } = Select;
export default class Header extends Component {
  onChangeAssignSelection = value => {
    console.log(`selected ${value}`);
  };
  onChangeStatusSelection = value => {
    console.log(`selected ${value}`);
  };

  render() {
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
          optionFilterProp="children"
          onChange={this.onChangeAssignSelection}
        >
          <Option value="mohamed">Mohamed</Option>
          <Option value="jawher">Jawher</Option>
          <Option value="moncef">Moncef</Option>
        </Select>{' '}
        {'    '}
        <Select
          style={{ width: 200 }}
          placeholder="Status"
          optionFilterProp="children"
          onChange={this.onChangeStatusSelection}
        >
          <Option value="open">Open</Option>
          <Option value="closed">Closed</Option>
        </Select>
        <Divider />
      </div>
    );
  }
}
