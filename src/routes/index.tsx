import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import DashboardAdm from '../pages/Dashboard-adm';

import DashboardUser from '../pages/Dashboard-user';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/admin" component={DashboardAdm} isPrivate isAdmin />

    <Route path="/user" component={DashboardUser} isPrivate isUser />
  </Switch>
);

export default Routes;
