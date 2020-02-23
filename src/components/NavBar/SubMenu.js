import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default function SubMenu(onClick, status) {
  return (
    <Menu>
      <Menu.Item onClick={onClick}>
        <Link to="#">
          {status === 'success' ? (
            <span> Off work mode</span>
          ) : (
            <span> Go Back online</span>
          )}
          <Icon
            type="minus-circle"
            theme="twoTone"
            twoToneColor="#eb2f96"
            style={{ marginLeft: '8px' }}
          />
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account">Account</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="#">Logout</Link>
      </Menu.Item>
    </Menu>
  );
}
