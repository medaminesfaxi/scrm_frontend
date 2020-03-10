import React, { Component } from 'react';
import styles from './styles.module.css';
import { Table, Button, Popconfirm, Divider } from 'antd';
import AddMacro from './../components/AddMacro';
import EditMacro from './../components/EditMacro';

const data = [
  {
    key: '2',
    name: 'greeting',
    text:
      'Hello and welcome everyone this is great!, Hello and welcome everyone this is great!, Hello and welcome everyone this is great!, Hello and welcome everyone this is great!, Hello and welcome everyone this is great!'
  },
  {
    key: '3',
    name: 'Bye',
    text: 'Good bye my lover good bye my friend!'
  }
];

export default class Macros extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%'
      },
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        width: '60%'
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <Button
                  loading={this.state.buttonLoading}
                  shape="circle"
                  type="danger"
                  size="small"
                  icon="delete"
                ></Button>
              </Popconfirm>
              <Divider type="vertical"></Divider>
              <EditMacro editMacro={this.editMacro} macro={record} />
            </>
          ) : null
      }
    ];
  }
  state = {
    buttonLoading: false,
    dataSource: data
  };

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  createMacro = values => {
    const { name, text } = values;
    let newMacro = {
      key: parseInt(
        this.state.dataSource[this.state.dataSource.length - 1].key + 1
      ).toString(),
      name,
      text
    };
    let ds = [...this.state.dataSource];
    ds.push(newMacro);
    this.setState({ dataSource: ds });
  };
  editMacro = values => {
    const { name, text } = values;
    let newMacro = {
      key: parseInt(
        this.state.dataSource[this.state.dataSource.length - 1].key + 1
      ).toString(),
      name,
      text
    };
    let ds = [...this.state.dataSource];
    ds.push(newMacro);
    this.setState({ dataSource: ds });
  };
  render() {
    return (
      <>
        <article>
          <div className={styles.banner}>
            <h1>Macros</h1>
          </div>
          <div
            className={styles.bigger__container + ' ' + styles.table__container}
          >
            <AddMacro createMacro={this.createMacro} />
            <Table columns={this.columns} dataSource={this.state.dataSource} />
          </div>
        </article>
      </>
    );
  }
}
