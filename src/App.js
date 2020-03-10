import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Users from './pages/Users';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import Macros from './pages/Macros';
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/Signup" component={Signup} />
            <PrivateRoute path="/conversations/:id" component={Conversations} />
            <PrivateRoute path="/conversations" component={Conversations} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/macros" component={Macros} />
            <PrivateRoute
              path="/dashboard"
              roles="ADMIN"
              component={Dashboard}
            />
            <PrivateRoute path="/Users" roles="ADMIN" component={Users} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
