import React, { Component } from 'react';
import styles from '../pages/styles.module.css';
import { Icon, Popconfirm } from 'antd';

const Note = ({ text, deleteNote, id, loading }) => {
  return (
    <div className={styles.note}>
      {text}
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={() => deleteNote(id)}
      >
        {loading ? (
          <Icon className={styles.delete__note} type="loading" />
        ) : (
          <Icon
            className={styles.delete__note}
            type="delete"
            theme="twoTone"
            twoToneColor="#eb2f96"
          />
        )}
      </Popconfirm>
    </div>
  );
};

export default class Notes extends Component {
  handleDeleteBtnClick = () => {
    // to do : delete note
  };
  render() {
    const { notes } = this.props;
    return (
      <div
        style={{
          background: '#fff',
          padding: '26px 18px',
          flex: '1 0',
          overflowY: 'auto',
        }}
      >
        <h2>
          <Icon type="book" style={{ color: 'orange' }}></Icon> Notes:
        </h2>
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              loading={this.props.loading}
              id={note.id}
              text={note.text}
              deleteNote={this.props.deleteNote.bind(null, note._id)}
            />
          );
        })}
      </div>
    );
  }
}
