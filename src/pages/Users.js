import React, { Component } from 'react';
import styles from './styles.module.css';
import {
  Table,
  Input,
  Button,
  Icon,
  Popconfirm,
  Divider,
  Tag,
  Avatar
} from 'antd';
import Highlighter from 'react-highlight-words';
import AddUserDrawer from './../components/AddUserDrawer';
import EditUserDrawer from './../components/EditUserDrawer';

const data = [
  {
    key: '1',
    avatar: '',
    fullname: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    languages: ['arabic', 'english'],
    is_admin: true
  },
  {
    key: '2',
    avatar: '',
    fullname: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    languages: ['french', 'english'],
    is_admin: false
  }
];

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '',

        key: 'avatar',
        width: '1%',
        render: text => <Avatar size={36} icon="user" src={text} />
      },
      {
        title: 'User',
        dataIndex: 'fullname',
        key: 'fullname',
        ...this.getColumnSearchProps('fullname')
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: skills => (
          <span>
            {skills.map((skill, index) => {
              const colors = ['#2db7f5', '#87d068', '#108ee9'];
              return (
                <Tag color={colors[index]} key={skill}>
                  {skill.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      },
      {
        title: 'Languages',
        dataIndex: 'languages',
        key: 'languages',
        render: languages => (
          <span>
            {languages.map(language => {
              const langs = { french: 'FR', arabic: 'AR', english: 'EN' };
              const colors = {
                french: 'geekblue',
                arabic: 'purple',
                english: 'volcano'
              };
              return (
                <Tag color={colors[language]} key={language}>
                  {langs[language]}
                </Tag>
              );
            })}
          </span>
        )
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
              <EditUserDrawer
                user_id={record.key}
                username={record.user}
                loading={this.state.buttonLoading}
              />
            </>
          ) : null
      },
      {
        title: 'Admin',
        dataIndex: 'is_admin',
        render: (text, record) =>
          text ? (
            <Icon
              type="safety-certificate"
              theme="filled"
              style={{ fontSize: '22px', marginLeft: '18px', color: '#52c41a' }}
            />
          ) : (
            <Icon
              type="safety-certificate"
              theme="filled"
              style={{ fontSize: '22px', marginLeft: '18px', color: '#ccc' }}
            />
          )
      }
    ];
  }
  state = {
    buttonLoading: false,
    dataSource: data,
    searchText: '',
    searchedColumn: ''
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleCreateUser = values => {
    const { fullname, skills, is_admin, languages } = values;
    let newUser = {
      key: parseInt(
        this.state.dataSource[this.state.dataSource.length - 1].key + 1
      ).toString(),
      fullname,
      avatar: '',
      skills,
      is_admin,
      languages
    };
    let ds = [...this.state.dataSource];
    ds.push(newUser);
    this.setState({ dataSource: ds });
  };

  render() {
    return (
      <>
        <article>
          <div className={styles.banner}>
            <h1>USERS</h1>
          </div>
          <div
            className={styles.bigger__container + ' ' + styles.table__container}
          >
            <AddUserDrawer handleCreateUser={this.handleCreateUser} />
            <Table columns={this.columns} dataSource={this.state.dataSource} />
          </div>
        </article>
      </>
    );
  }
}
