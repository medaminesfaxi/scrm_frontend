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

const data = [
  {
    key: '1',
    avatar: '',
    user: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    is_admin: true
  },
  {
    key: '2',
    avatar: '',
    user: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    is_admin: true
  },
  {
    key: '3',
    avatar:
      'https://scontent.ftun11-1.fna.fbcdn.net/v/t1.0-9/56196777_2370263756337563_5897750826310434816_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_ohc=l-JoEUse1d4AX-GM_Gm&_nc_ht=scontent.ftun11-1.fna&oh=828cc2709b0c837cd67159c0f60467f0&oe=5EF36B5E',
    user: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    is_admin: true
  },
  {
    key: '4',
    avatar: '',
    user: 'Mohamed amine',
    skills: ['exmple 1', 'exemple 2'],
    is_admin: true
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
        dataIndex: 'user',
        key: 'user',
        ...this.getColumnSearchProps('user')
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: skills => (
          <span>
            {skills.map(skill => {
              let color = skill.length > 8 ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={skill}>
                  {skill.toUpperCase()}
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
                  onClick={this.handleDelete}
                  size="small"
                  icon="delete"
                ></Button>
              </Popconfirm>
              <Divider type="vertical"></Divider>
              <Button
                loading={this.state.buttonLoading}
                shape="circle"
                onClick={this.handleEdit}
                type="primary"
                size="small"
                icon="edit"
              ></Button>
            </>
          ) : null
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
  handleEdit = key => {
    console.log('edit');
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
            <AddUserDrawer />
            <Table columns={this.columns} dataSource={data} />
          </div>
        </article>
      </>
    );
  }
}
