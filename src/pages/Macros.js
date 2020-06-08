import React, { Component } from 'react';
import styles from './styles.module.css';
import { Table, Button, Popconfirm, Divider } from 'antd';
import AddMacro from './../components/AddMacro';
import EditMacro from './../components/EditMacro';
import { Request } from './../shared/utils';

export default class Macros extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
      },
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        width: '60%',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record._id)}
              >
                <Button
                  loading={this.state.btnLoading}
                  shape="circle"
                  type="danger"
                  size="small"
                  icon="delete"
                ></Button>
              </Popconfirm>
              <Divider type="vertical"></Divider>
              <EditMacro editMacro={this.editMacro} macro={record} />
            </>
          ) : null,
      },
    ];
  }
  state = {
    loading: false,
    dataSource: [],
    btnLoading: false,
  };
  componentDidMount() {
    this.mounted = true;
    const fetchData = async () => {
      this.setState({ loading: true });
      let res = await Request('GET', '/api/macro');
      if (this.mounted) {
        this.setState({ dataSource: res.data, loading: false });
      }
    };
    fetchData();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  handleDelete = async (_id) => {
    this.setState({ btnLoading: true });
    await Request('DELETE', `/api/macro/${_id}`);
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item._id !== _id),
    });
    this.setState({ btnLoading: false });
  };
  createMacro = async (values) => {
    const { name, text } = values;
    let res = await Request('POST', '/api/macro', { name, text });
    let ds = [...this.state.dataSource];
    ds.push(res.data);
    this.setState({ dataSource: ds });
  };
  editMacro = async (values, _id) => {
    const { name, text } = values;
    await Request('PUT', `/api/macro/${_id}`, { name, text });
    let ds = [...this.state.dataSource];
    for (let i = 0; i < ds.length; i++) {
      if (ds[i]._id === _id) {
        ds[i].name = name;
        ds[i].text = text;
      }
    }
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
            <Table
              loading={this.state.loading}
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowKey="_id"
            />
          </div>
        </article>
      </>
    );
  }
}
