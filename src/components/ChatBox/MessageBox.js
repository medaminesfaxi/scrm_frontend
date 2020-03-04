import React from 'react';
import moment from 'moment';
export default function MessageBox(props) {
  const {
    type,
    timestamp,
    timestampFormat,
    left,
    author,
    hasError,
    text
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
    return (
      <div
        className={`react-chat-messageBox ${
          left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'
        }`}
      >
        <img
          alt="avater img"
          src={
            author.avatarUrl
              ? author.avatarUrl
              : 'https://image.flaticon.com/icons/svg/2446/2446032.svg'
          }
          className={`react-chat-avatar ${
            left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'
          }`}
        />
        <div
          className={`react-chat-message ${
            left ? 'react-chat-messageLeft' : 'react-chat-messageRight'
          }`}
        >
          <div className="react-chat-additional">{author.username}</div>
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
  } else if (type === 'note') {
    return (
      <div className="react-chat-note react-chat-messageBoxRight">
        {text}{' '}
        <div className="react-chat-additional">{time !== null && time}</div>
      </div>
    );
  }
}
