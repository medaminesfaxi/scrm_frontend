import React, { Component } from 'react';
import styles from './navbar.module.css';
import { Icon, Badge, Avatar, Dropdown, notification } from 'antd';
import { NavLink, Link, withRouter } from 'react-router-dom';
import logo from '../../header_logo.png';
import SubMenu from './SubMenu';
import { authService } from './../../services/authService';
import { Request } from '../../shared/utils';
import socketIOClient from 'socket.io-client';
class NavBar extends Component {
  state = {
    counter: 0,
    status: 'success',
  };
  componentDidMount() {
    this.mounted = true;
    this.socket = socketIOClient(process.env.REACT_APP_API_URL);
    this.socket.emit('join', this.props.id);
    this.socket.on('addedNewConversation', (newConversation) => {
      notification.config({
        placement: 'topRight',
        top: 120,
        duration: 1.45,
      });
      notification.open({
        message: (
          <>
            {' '}
            <Avatar src={newConversation.customerAvatar} />{' '}
            {newConversation.from}
            {'  '}
            sent you a message
          </>
        ),
      });
    });
    if (this.state.counter > 0)
      document.title = '(' + this.state.counter + ') SCRM';
    const getStatus = async () => {
      let res = await Request('GET', '/api/user/status');
      if (this.mounted)
        this.setState(
          {
            status: res.data.status.status,
            counter: res.data.conversations,
          },
          () => {
            this.socket.emit('onlineUsers', {
              status: this.state.status,
              id: this.props.id,
              fullname: this.props.fullname,
              avatarSrc: this.props.avatarSrc,
            });
          }
        );
    };
    getStatus();
    this.socket.on('counterChange', () => {
      document.title = 'You have a new message';
      this.setState((prevState) => {
        return { counter: prevState.counter + 1 };
      });
    });
  }
  componentDidUpdate() {
    if (this.state.counter > 0)
      setTimeout(
        () => (document.title = '(' + this.state.counter + ') SCRM'),
        3000
      );
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  onClick = async () => {
    let status;
    if (this.state.status === 'warning') {
      status = 'success';
      this.socket.emit('onlineUsers', {
        status,
        id: this.props.id,
        fullname: this.props.fullname,
        avatarSrc: this.props.avatarSrc,
      });
    } else {
      status = 'warning';
      this.socket.emit('onlineUsers', {
        status,
        id: this.props.id,
        fullname: this.props.fullname,
        avatarSrc: this.props.avatarSrc,
      });
    }
    await Request('PUT', '/api/user/status', { status });
    this.setState({ status });
  };
  logout = () => {
    authService.logout();
    this.props.history.push('/login');
  };
  render() {
    const { fullname, avatarSrc, is_admin } = this.props;
    return (
      <div className={styles.header}>
        <ul>
          <section>
            <div className={styles.logo}>
              <Link to="/dashboard" style={{ textAlign: 'center' }}>
                <img src={logo} alt="vneuron" />
              </Link>
            </div>
            <div>
              <NavLink
                activeClassName="selected"
                to="/conversations"
                style={{ textAlign: 'center' }}
              >
                <Badge count={this.state.counter} offset={['-10,0']}>
                  <Icon
                    type="message"
                    theme="twoTone"
                    style={{ fontSize: '28px' }}
                  />
                </Badge>
              </NavLink>
            </div>
            <div>
              <div>
                <NavLink
                  activeClassName="selected"
                  to="/macros"
                  style={{ textAlign: 'center' }}
                >
                  <Icon
                    type="container"
                    theme="twoTone"
                    style={{ fontSize: '28px' }}
                  />
                  <div
                    style={{
                      height: '0px',
                      margin: 0,
                      padding: 0,
                      position: 'relative',
                      top: '-15px',
                    }}
                  >
                    {' '}
                    Macros
                  </div>
                </NavLink>
              </div>
            </div>
            {is_admin ? (
              <>
                <div>
                  <NavLink
                    activeClassName="selected"
                    to="/users"
                    style={{ textAlign: 'center' }}
                  >
                    <Icon type="user" style={{ fontSize: '28px' }} />
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    exact={true}
                    activeClassName="selected"
                    to="/dashboard"
                    style={{ textAlign: 'center' }}
                  >
                    <Icon
                      type="dashboard"
                      theme="twoTone"
                      style={{ fontSize: '28px' }}
                    />
                  </NavLink>
                </div>
              </>
            ) : null}
          </section>
          <Dropdown
            placement="topCenter"
            overlay={SubMenu(this.onClick, this.state.status, this.logout)}
          >
            <div className="right__items">
              <Badge
                status={this.state.status}
                dot
                offset={[-3, 50]}
                style={{ width: '8px', height: '8px' }}
              >
                <Avatar size={36} icon="user" src={avatarSrc} />
              </Badge>
              <span>{fullname}</span>
              <Icon
                type="down"
                style={{
                  fontSize: '22px',
                  position: 'relative',
                  left: '-14px',
                }}
              />
            </div>
          </Dropdown>
        </ul>
      </div>
    );
  }
}
export default withRouter(NavBar);
