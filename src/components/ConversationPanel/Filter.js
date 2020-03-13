import React, { Component } from 'react';
import { Button, Tooltip, Checkbox, Divider, Input } from 'antd';

const { Search } = Input;
const CheckboxGroup = Checkbox.Group;

class Filter extends Component {
  state = {
    filterVisible: false,
    searchLoading: false
  };
  toggleFilters = () => {
    this.setState({ filterVisible: !this.state.filterVisible });
  };
  render() {
    const list = [...this.props.checkedTags];
    return (
      <>
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <Search
            value={this.props.search}
            onChange={this.props.handleSearchInputChange}
            allowClear
            style={{ marginRight: '4px' }}
            onSearch={this.props.handleSearchByInput}
            placeholder="search..."
            loading={this.props.searchLoading}
            enterButton
          />
          <Tooltip placement="top" title={'Filter'}>
            <Button icon="filter" type="primary" onClick={this.toggleFilters} />
          </Tooltip>
        </div>
        {this.state.filterVisible ? (
          <div style={{ margin: '12px 0' }}>
            <h3>Filter</h3>
            <CheckboxGroup
              value={list}
              onChange={this.props.onChangeTags}
              options={this.props.tags}
            />
            <Divider>
              <Button type="primary" onClick={this.props.handleFilter}>
                Search
              </Button>
              <Divider type="vertical" />
              <Button onClick={this.props.clearFilter}>Clear</Button>
            </Divider>
          </div>
        ) : null}
      </>
    );
  }
}
export default Filter;
