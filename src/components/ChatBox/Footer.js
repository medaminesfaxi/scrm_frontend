import React, { Component } from 'react';
import { Button, Tag, Input, Icon, Select } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import AddMacro from '../AddMacro';

const { Option } = Select;
export default class Footer extends Component {
  state = {
    tags: this.props.tags,
    inputVisible: false,
    inputValue: ''
  };
  onChangeAssignSelection = value => {
    console.log(`selected ${value}`);
  };
  onChangeStatusSelection = value => {
    console.log(`selected ${value}`);
  };
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  };
  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div
        style={{
          padding: '12px',
          background: '#fff'
        }}
      >
        {this.props.disabled && (
          <>
            <Button icon="book" size="small" onClick={this.props.addNote}>
              Add note
            </Button>
            <Select
              value={this.props.selectedMacro}
              size="small"
              placeholder="Use macros"
              style={{ width: 120, marginLeft: '36px' }}
              onSelect={this.props.useMacro}
            >
              {Object.keys(this.props.macros).map(key => {
                return (
                  <Option key={key} value={key}>
                    {key}
                  </Option>
                );
              })}
            </Select>
            <AddMacro />
          </>
        )}
        <span
          style={{
            margin: '0 8px 0 36px',
            background: '#1DC36B',
            color: '#fff',
            padding: '2px 8px',
            fontSize: '12px',
            borderRadius: '4px'
          }}
        >
          Tags
        </span>
        <div style={{ display: 'inline-block' }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              }
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{
              background: '#fff',
              borderStyle: 'dashed',
              cursor: 'pointer'
            }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}
