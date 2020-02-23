import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './../components/NavBar/NavBar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = {
    username: 'Mohamed amine',
    avatarSrc: '',
    status: 'success ', //error, warning
    is_admin: true
  };
  // const currentUser = null;
  return (
    <>
      <Route
        {...rest}
        render={props =>
          currentUser !== null ? (
            <>
              <NavBar {...currentUser} />
              <Component {...props} {...rest} user={currentUser} />
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
};
export default PrivateRoute;
