import React, { Component } from 'react';
import { Button, Tag, Input, Icon, Select, message, Upload } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { Request, authHeader } from './../../shared/utils';

const { Option } = Select;
export default class Footer extends Component {
  state = {
    tags: this.props.tags,
    inputVisible: false,
    inputValue: '',
    macros: [],
    fileList: [],
  };
  componentDidMount() {
    const fetchData = async () => {
      let res = await Request('GET', '/api/macro');
      this.setState({ macros: res.data });
    };
    fetchData();
  }
  onChange(info) {
    console.log(info);
  }
  onChangeAssignSelection = (value) => {
    console.log(`selected ${value}`);
  };
  onChangeStatusSelection = (value) => {
    console.log(`selected ${value}`);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = async () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      let res = await Request(
        'POST',
        '/api/tags/' + this.props.conversationId,
        {
          name: inputValue,
        }
      );
      tags = [...tags, { _id: res.data._id, name: inputValue }];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleClose = async (removedTag) => {
    console.log(removedTag);
    await Request('PUT', '/api/tags/' + this.props.conversationId, {
      _id: removedTag,
    });
    const tags = this.state.tags.filter((tag) => tag._id !== removedTag);
    this.setState({ tags });
  };

  saveInputRef = (input) => (this.input = input);

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag._id);
        }}
      >
        {tag.name}
      </Tag>
    );
    return (
      <span key={tag._id} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };
  handleChange = (info) => {
    let fileList = [...info.fileList];
    if (typeof info.file.status === 'undefined') {
      this.setState({
        fileList: [],
      });
    } else {
      this.setState({ fileList });
      if (info.file.status === 'done') {
        let type;
        if (info.file.response.type.indexOf('image') > -1) {
          type = 'image';
        } else type = 'file';
        this.props.handleOnSendMessage(info.file.response.path, type);
        setTimeout(() => {
          this.setState({
            fileList: [],
          });
        }, 1000);
      }
    }
  };
  render() {
    const props = {
      action:
        process.env.REACT_APP_API_URL +
        'api/conversations/attachment/' +
        this.props.conversationId,
      headers: {
        token: authHeader(),
      },
      onChange: this.handleChange,
      beforeUpload: (file) => {
        const validType =
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png' ||
          file.type === 'application/pdf';
        if (!validType) {
          message.error('unsupported file!');
        }
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
          message.error('file must be smaller than 20MB!');
        }
        return validType && isLt20M;
      },
    };
    const { tags, inputVisible, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <div
        style={{
          padding: '12px 12px 20px 12px',
          background: '#fff',
        }}
      >
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
            {this.state.macros.map((macro) => {
              return (
                <Option key={macro._id} value={macro.text}>
                  {macro.name}
                </Option>
              );
            })}
          </Select>
        </>
        <span
          style={{
            margin: '0 8px 0 36px',
            background: '#1DC36B',
            color: '#fff',
            padding: '2px 8px',
            fontSize: '12px',
            borderRadius: '4px',
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
              onComplete: (e) => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <>
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            ></Input>
          </>
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{
              background: '#fff',
              borderStyle: 'dashed',
              cursor: 'pointer',
            }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
        <Upload {...props} fileList={this.state.fileList}>
          <Button
            disabled={this.state.fileList.length > 0}
            style={{
              padding: '0 6px',
              marginLeft: '290px',
            }}
          >
            <Icon type="paper-clip" /> Send an attachment
          </Button>
        </Upload>
      </div>
    );
  }
}
