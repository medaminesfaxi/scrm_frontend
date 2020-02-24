/* 
  @props : username , avatarSrc, is_admin, status
*/

import React, { Component } from 'react';
import styles from './navbar.module.css';
import { Icon, Badge, Avatar, Dropdown } from 'antd';
import { NavLink, Link, withRouter } from 'react-router-dom';
import logo from '../../header_logo.png';
import SubMenu from './SubMenu';
import { authService } from './../../services/authService';
class NavBar extends Component {
  state = {
    status: 'success'
  };
  onClick = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    let status;
    status = this.state.status === 'warning' ? 'success' : 'warning';
    this.setState({ status });
  };

  logout = () => {
    authService.logout();
    this.props.history.push('/login');
  };
  render() {
    const { username, avatarSrc, is_admin } = this.props;
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
                <Badge count={5} offset={['-10,0']}>
                  <Icon
                    type="message"
                    theme="twoTone"
                    style={{ fontSize: '28px' }}
                  />
                </Badge>
              </NavLink>
            </div>
            {is_admin ? (
              <>
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
                <div>
                  <NavLink
                    activeClassName="selected"
                    to="/users"
                    style={{ textAlign: 'center' }}
                  >
                    <Icon type="user" style={{ fontSize: '28px' }} />
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
              <span>{username}</span>
              <Icon
                type="down-circle"
                theme="twoTone"
                style={{ fontSize: '28px' }}
              />
            </div>
          </Dropdown>
        </ul>
      </div>
    );
  }
}
export default withRouter(NavBar);
