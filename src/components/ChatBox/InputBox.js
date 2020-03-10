import React from 'react';
import { Icon, Button } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';

export default function InputBox(props) {
  const handleResumeClick = () => {};
  return (
    <div
      className={`react-chat-inputBox ${
        props.disabled || props.taken ? 'disabled' : ''
      }`}
      style={{ border: props.border }}
    >
      <TextareaAutosize
        maxRows={3}
        inputRef={props.setRef}
        className="react-chat-textarea"
        placeholder={
          props.disabled || props.taken
            ? props.disabledInputPlaceholder
            : props.placeholder
            ? props.placeholder
            : 'Press shift + enter to send'
        }
        value={props.inputText}
        onChange={props.handleOnChange}
        onKeyPress={props.onKeyPress}
        autoFocus
        disabled={props.disabled || props.taken}
      />
      {!props.disabled && !props.taken && (
        <button className="react-chat-sendButton" onClick={props.handleOnClick}>
          <Icon type="aliwangwang" className="react-chat-sendButton" />
        </button>
      )}
      {props.disabled && (
        <Button type="primary" onClick={handleResumeClick}>
          Resume conversation
        </Button>
      )}
    </div>
  );
}
