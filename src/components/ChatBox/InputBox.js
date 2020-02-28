import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';

export default function InputBox(props) {
  const [inputText, setInputText] = useState('');

  const handleOnChange = e => {
    setInputText(e.target.value);
  };

  const strip = str => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  const handleOnClick = e => {
    let str = strip(inputText);
    if (str.length) {
      sendMessage(str);
    } else {
      // to do cannot send empty message
    }
  };

  const onKeyPress = e => {
    if (e.shiftKey && e.charCode === 13) {
      let str = strip(inputText);
      if (str.length) {
        sendMessage(str);
      }
      e.preventDefault();
      return false;
    }
  };

  const sendMessage = message => {
    props.onSendMessage(message);
    setInputText('');
  };

  return (
    <div className={`react-chat-inputBox ${props.disabled ? 'disabled' : ''}`}>
      <TextareaAutosize
        maxRows={3}
        className="react-chat-textarea"
        placeholder={
          props.disabled
            ? props.disabledInputPlaceholder
            : props.placeholder
            ? props.placeholder
            : 'Press shift + enter to send'
        }
        value={inputText}
        onChange={handleOnChange}
        onKeyPress={onKeyPress}
        autoFocus
        disabled={props.disabled}
      />
      <button
        className="react-chat-sendButton"
        onClick={handleOnClick}
        disabled={props.disabled}
      >
        <Icon type="aliwangwang" className="react-chat-sendButton" />
      </button>
    </div>
  );
}

InputBox.propTypes = {
  onSendMessage: PropTypes.func,
  disabled: PropTypes.bool,
  disabledInputPlaceholder: PropTypes.string,
  placeholder: PropTypes.string
};
