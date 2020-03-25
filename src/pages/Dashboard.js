import React, { Component } from 'react';
import styles from './styles.module.css';
import Charts from './../components/Charts';
import { Divider, Select } from 'antd';

const { Option } = Select;
export default class Dashboard extends Component {
  state = {
    activeCard: 1,
    data: [15, 10, 20, 50, 15, 40, 100, 50],
    agents: [
      { id: 1, name: 'Mohmed' },
      { id: 2, name: 'Omar' },
      { id: 3, name: 'Ayoub' },
      { id: 4, name: 'Skon' }
    ]
  };
  handleChange = value => {
    console.log('value');
  };

  fetchIncomingConversations = () => {
    this.setState({ activeCard: 1 });
    let fake = [15, 10, 20, 50, 15, 40, 100, 50];
    this.setState({ data: fake });
  };

  fetchResolvedConversations = () => {
    this.setState({ activeCard: 2 });
    let fake = [20, 10, 30, 10, 0, 100, 120, 50];
    this.setState({ data: fake });
  };

  formatData = () => {
    return {
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Performance',
          data: this.state.data
        }
      ]
    };
  };
  render() {
    return (
      <>
        <div className={styles.banner}>
          <h1>DASHBOARD</h1>
        </div>
        <div className="stats ">
          <Select
            style={{ width: 180 }}
            onChange={this.handleChange}
            defaultValue="All agents"
          >
            <Option value={'All agents'}>All agents</Option>
            {this.state.agents.map(agent => {
              return (
                <Option key={agent.id} value={agent.id}>
                  {agent.name}
                </Option>
              );
            })}
          </Select>
          <Divider></Divider>
          <br />
          <div
            className={
              this.state.activeCard === 1 ? ' stat__card active' : 'stat__card'
            }
            onClick={this.fetchIncomingConversations}
          >
            <h2>156</h2>
            <h3>Incoming Conversations</h3>
          </div>
          <div
            className={
              this.state.activeCard === 2 ? 'stat__card active' : 'stat__card'
            }
            onClick={this.fetchResolvedConversations}
          >
            <h2>65</h2>
            <h3>Resolved Conversations</h3>
          </div>
          <div className="stat__card">
            <h2>
              22<span>mins</span> 5<span>sec</span>
            </h2>
            <h3>First Response Time</h3>
          </div>
          <div className="stat__card">
            <h2>
              5<span>mins</span>
            </h2>
            <h3>Resolution Time</h3>
          </div>
          <Charts data={this.formatData} />
        </div>
      </>
    );
  }
}
