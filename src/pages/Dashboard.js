import React, { Component } from 'react';
import styles from './styles.module.css';
import Charts from './../components/Charts';
import { Divider, Select, Avatar, Spin, Icon } from 'antd';
import { Request } from './../shared/utils';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { Option } = Select;

export default class Dashboard extends Component {
  state = {
    optionLoading: false,
    loading: false,
    activeCard: 1,
    resolutionTime: 0,
    firstResponseTime: 0,
    incomingConversations: [],
    resolvedConversations: [],
    chartData: [],
    users: [],
  };
  componentDidMount() {
    this.mounted = true;
    const fetchUser = async () => {
      this.setState({ optionLoading: true });
      const res = await Request('GET', '/api/admin/users');
      if (this.mounted) {
        this.setState({ users: res.data, optionLoading: false });
      }
    };
    const fetchStats = async () => {
      this.setState({ loading: true });
      const res = await Request('GET', '/api/admin/analytics/all');

      if (this.mounted) {
        this.setState({
          loading: false,
          chartData: res.data.incoming_conversations,
          incomingConversations: res.data.incoming_conversations,
          resolvedConversations: res.data.resolved_conversations,
          resolutionTime: res.data.resolution_time,
          firstResponseTime: res.data.firstResponse_time,
        });
      }
    };
    fetchStats();
    fetchUser();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange = async (value) => {
    this.setState({ loading: true });
    const res = await Request('GET', '/api/admin/analytics/' + value);
    this.setState({
      loading: false,
      chartData: res.data.incoming_conversations,
      incomingConversations: res.data.incoming_conversations,
      resolvedConversations: res.data.resolved_conversations,
      resolutionTime: res.data.resolution_time,
      firstResponseTime: res.data.firstResponse_time,
    });
  };

  fetchIncomingConversations = () => {
    this.setState({
      activeCard: 1,
      chartData: this.state.incomingConversations,
    });
  };

  fetchResolvedConversations = () => {
    this.setState({
      activeCard: 2,
      chartData: this.state.resolvedConversations,
    });
  };

  formatData = () => {
    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Performance',
          data: this.state.chartData,
        },
      ],
    };
  };
  render() {
    let rTotal = this.state.resolutionTime;
    let rHours = Math.floor(rTotal / 3600);
    rTotal = rTotal - rHours * 3600;
    let rMins = Math.floor(rTotal / 60);
    rTotal = rTotal - rMins * 60;
    let rSec = Math.floor(rTotal);

    let fTotal = this.state.firstResponseTime;
    let fHours = Math.floor(fTotal / 3600);
    fTotal = fTotal - fHours * 3600;
    let fMins = Math.floor(fTotal / 60);
    fTotal = fTotal - fMins * 60;
    let fSec = Math.floor(fTotal);
    return (
      <>
        <div className={styles.banner}>
          <h1>DASHBOARD</h1>
        </div>
        <div className="stats ">
          <Select
            loading={this.state.optionLoading}
            style={{ width: 180 }}
            onChange={this.handleChange}
            defaultValue="All agents"
          >
            <Option value={'all'}>All agents</Option>
            {this.state.users.map((user) => {
              return (
                <Option key={user._id} value={user._id}>
                  <Avatar
                    src={user.avatarSrc}
                    size={16}
                    icon="user"
                    style={{ margin: '2px', cursor: 'pointer' }}
                  />
                  {'      '}
                  {user.fullname}
                </Option>
              );
            })}
          </Select>
          <Divider></Divider>
          <br />
          <Spin spinning={this.state.loading} indicator={antIcon}>
            <div
              className={
                this.state.activeCard === 1
                  ? ' stat__card active'
                  : 'stat__card'
              }
              onClick={this.fetchIncomingConversations}
            >
              <h2>
                {this.state.incomingConversations.reduce((a, b) => a + b, 0)}
              </h2>
              <h3>Incoming Conversations</h3>
            </div>
            <div
              className={
                this.state.activeCard === 2 ? 'stat__card active' : 'stat__card'
              }
              onClick={this.fetchResolvedConversations}
            >
              <h2>
                {this.state.resolvedConversations.reduce((a, b) => a + b, 0)}
              </h2>
              <h3>Resolved Conversations</h3>
            </div>
            <div className="stat__card">
              <h2>
                {this.state.resolutionTime === 0 ? ' N/A ' : fHours}
                <span>Hours </span>
                {this.state.resolutionTime === 0 ? ' N/A ' : fMins}
                <span>mins </span>
                {this.state.resolutionTime === 0 ? ' N/A ' : fSec}
                <span>sec </span>
              </h2>
              <h3>First Response Time</h3>
            </div>
            <div className="stat__card">
              <h2>
                {this.state.resolutionTime === 0 ? ' N/A ' : rHours}
                <span>Hours </span>
                {this.state.resolutionTime === 0 ? ' N/A ' : rMins}
                <span>mins </span>
                {this.state.resolutionTime === 0 ? ' N/A ' : rSec}
                <span>sec </span>
              </h2>
              <h3>Resolution Time</h3>
            </div>
          </Spin>
          <Charts data={this.formatData} />{' '}
        </div>
      </>
    );
  }
}
