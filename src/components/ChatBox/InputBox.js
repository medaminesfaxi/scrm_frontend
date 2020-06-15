import React from 'react';
import { Icon } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';

export default class InputBox extends React.PureComponent {
  render() {
    return (
      <div
        className={`react-chat-inputBox ${
          this.props.disabled || this.props.taken ? 'disabled' : ''
        }`}
        style={{ border: this.props.border }}
      >
        <TextareaAutosize
          maxRows={3}
          inputRef={this.props.setRef}
          className="react-chat-textarea"
          placeholder={
            this.props.disabled || this.props.taken
              ? this.props.disabledInputPlaceholder
              : this.props.placeholder
              ? this.props.placeholder
              : 'Press shift + enter to send'
          }
          value={this.props.inputText}
          onChange={this.props.handleOnChange}
          onKeyPress={this.props.onKeyPress}
          autoFocus
          disabled={this.props.disabled || this.props.taken}
        />
        {!this.props.disabled && !this.props.taken && (
          <button
            className="react-chat-sendButton"
            onClick={this.props.handleOnClick}
          >
            {this.props.loading ? (
              <Icon type="loading" className="react-chat-sendButton" />
            ) : (
              <Icon type="aliwangwang" className="react-chat-sendButton" />
            )}
          </button>
        )}
      </div>
    );
  }
}
