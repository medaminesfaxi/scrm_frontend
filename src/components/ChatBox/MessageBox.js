import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';

export default function MessageBox(props) {
  const {
    type,
    timestamp,
    timestampFormat,
    left,
    author,
    hasError,
    text,
  } = props;
  let time;
  if (timestamp) {
    if (timestampFormat === 'calendar') {
      time = moment(timestamp).calendar();
    } else if (timestampFormat === 'fromNow') {
      time = moment(timestamp).fromNow();
    } else {
      time = moment(timestamp).format(timestampFormat);
    }
  }
  if (type === 'text' || type === 'indicator') {
    if (typeof author !== 'undefined')
      return (
        <div
          className={`react-chat-messageBox ${
            left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'
          }`}
        >
          <div
            className={`react-chat-avatar ${
              left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'
            }`}
          >
            <Avatar icon="user" src={author.avatarUrl} />
          </div>
          <div
            className={`react-chat-message ${
              left ? 'react-chat-messageLeft' : 'react-chat-messageRight'
            }`}
          >
            <div className="react-chat-additional">{author.fullname}</div>
            <div
              className={`react-chat-bubble ${
                left ? 'react-chat-leftBubble' : 'react-chat-rightBubble'
              } ${hasError ? 'react-chat-bubbleWithError' : ''}`}
            >
              {text}
            </div>
            <div className="react-chat-additional">{time !== null && time}</div>
          </div>
        </div>
      );
    else {
      return <div className="react-chat-notification">{text}</div>;
    }
  } else if (type === 'note') {
    return (
      <div className="react-chat-note react-chat-messageBoxRight">
        {text}
        <div className="react-chat-additional">{time !== null && time}</div>
      </div>
    );
  }
}
