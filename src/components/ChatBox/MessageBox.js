import React from 'react';
import moment from 'moment';
import ReactWebMediaPlayer from 'react-web-media-player';
import { Avatar, Icon } from 'antd';

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
  function Content() {
    switch (type) {
      case 'image':
        return (
          <img src={text} style={{ width: '40%', height: '40%' }} alt="404" />
        );
      case 'text':
        return text;
      case 'file': {
        let indx = 0,
          indx2 = 0;
        let name;
        if (text.indexOf(process.env.REACT_APP_API_URL) >= 0) {
          name = text.slice(text.lastIndexOf('/files') + 7, 99);
        } else if (text.indexOf('cdn.fbsbx.com/') >= 0) {
          if (text.indexOf('.pdf') !== -1) {
            indx = text.indexOf('.pdf') + 5;
            indx2 = text.lastIndexOf('.pdf') + 4;
          } else if (text.indexOf('.docx') !== -1) {
            indx = text.indexOf('.docx') + 6;
            indx2 = text.lastIndexOf('.docx') + 5;
          }
          name = text.slice(indx, indx2);
        }
        return (
          <>
            <a target="_blank" rel="noopener noreferrer" href={text}>
              <Icon type="file" /> {' ' + name}
            </a>
          </>
        );
      }
      case 'audio':
        return (
          <audio controls>
            <source src={text} />
          </audio>
        );
      default:
        return <ReactWebMediaPlayer video={text} />;
    }
  }

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
            <Content />
          </div>
          <div className="react-chat-additional">{time !== null && time}</div>
        </div>
      </div>
    );
  else return <div className="react-chat-notification">{text}</div>;
}
