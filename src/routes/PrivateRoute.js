import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from './../services/authService';
import NavBar from './../components/NavBar/NavBar';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const currentUser = authService.getCurrentUser();
        const role = currentUser.is_admin ? 'ADMIN' : null;
        if (!currentUser) {
          return <Redirect to={{ pathname: '/login' }} />;
        }
        if (roles && roles.indexOf(role) === -1) {
          return <Redirect to={{ pathname: '/conversations' }} />;
        }
        return (
          <>
            <NavBar {...currentUser} />
            <Component {...props} />
          </>
        );
      }}
    />
  );
};
export default PrivateRoute;
