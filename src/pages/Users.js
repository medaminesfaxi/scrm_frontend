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
  Avatar,
} from 'antd';
import Highlighter from 'react-highlight-words';
import AddUserDrawer from './../components/AddUserDrawer';
import EditUserDrawer from './../components/EditUserDrawer';
import { Request } from './../shared/utils';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '',
        dataIndex: 'avatarSrc',
        width: '1%',
        render: (src) => <Avatar size={36} icon="user" src={src} />,
      },
      {
        title: 'User',
        dataIndex: 'fullname',
        key: 'fullname',
        ...this.getColumnSearchProps('fullname'),
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: (skills) => (
          <span>
            {skills.map((skill, index) => {
              return (
                <Tag color="#87d068" key={skill._id}>
                  {skill.name.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: 'Languages',
        dataIndex: 'languages',
        key: 'languages',
        render: (languages) => (
          <span>
            {languages.map((language) => {
              return (
                <Tag color="geekblue" key={language._id}>
                  {language.name}
                </Tag>
              );
            })}
          </span>
        ),
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
                  loading={this.state.buttonLoading}
                  shape="circle"
                  type="danger"
                  size="small"
                  icon="delete"
                ></Button>
              </Popconfirm>
              <Divider type="vertical"></Divider>
              <EditUserDrawer
                userId={record._id}
                checkedSkills={record.skills}
                checkedLanguages={record.languages}
                fullname={record.fullname}
                languagesOptions={this.state.languagesOptions}
                skillsOptions={this.state.skillsOptions}
                loading={this.state.buttonLoading || this.state.optionsLoading}
              />
            </>
          ) : null,
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
          ),
      },
    ];
  }
  state = {
    buttonLoading: false,
    dataSource: [],
    skillsOptions: [],
    languagesOptions: [],
    searchText: '',
    searchedColumn: '',
    loading: false,
    optionsLoading: false,
  };
  componentDidMount() {
    this.mounted = true;
    const fetchData = async () => {
      this.setState({ optionsLoading: true });
      let res = await Request('GET', '/api/admin/users/options');
      let skills = [];
      let languages = [];
      for (let i = 0; i < res.data.skills.length; i++) {
        skills.push({
          label: res.data.skills[i].name,
          value: res.data.skills[i]._id,
        });
      }
      for (let i = 0; i < res.data.languages.length; i++) {
        languages.push({
          label: res.data.languages[i].name,
          value: res.data.languages[i]._id,
        });
      }
      if (this.mounted)
        this.setState({
          skillsOptions: skills,
          languagesOptions: languages,
          optionsLoading: false,
        });
    };
    const fetchUser = async () => {
      this.setState({ loading: true });
      let res = await Request('GET', '/api/admin/users/');
      if (this.mounted) {
        this.setState({ dataSource: res.data, loading: false });
      }
    };

    fetchData();
    fetchUser();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
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
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleDelete = async (key) => {
    this.setState({ buttonLoading: true });
    let res = await Request('DELETE', '/api/admin/users/' + key);
    if (res.status === 200) {
      const dataSource = [...this.state.dataSource];
      this.setState({
        dataSource: dataSource.filter((item) => item._id !== key),
      });
    }
    this.setState({ buttonLoading: false });
  };
  handleCreateUser = (values) => {
    const { skills, languages } = values;
    const { _id, fullname, is_admin, avatarSrc } = values.user;
    let newUser = {
      _id,
      fullname,
      avatar: avatarSrc,
      skills,
      is_admin,
      languages,
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
            <AddUserDrawer
              handleCreateUser={this.handleCreateUser}
              languagesOptions={this.state.languagesOptions}
              skillsOptions={this.state.skillsOptions}
              optionsLoading={this.state.optionsLoading}
            />
            <Table
              columns={this.columns}
              dataSource={this.state.dataSource}
              rowKey="_id"
              loading={this.state.loading}
            />
          </div>
        </article>
      </>
    );
  }
}
