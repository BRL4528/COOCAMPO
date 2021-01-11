import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import DashboardAdm from '../pages/Dashboard-adm';
import SelectorFolders from '../pages/Dashboard-adm/SelectorFolders';
import Email from '../pages/Dashboard-adm/Email';
import Report from '../pages/Dashboard-adm/Report';

import DashboardUser from '../pages/Dashboard-user';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/admin" component={DashboardAdm} isPrivate isAdmin />
    <Route
      path="/selector-folders"
      component={SelectorFolders}
      isPrivate
      isAdmin
    />
    <Route path="/e-mail" component={Email} isPrivate isAdmin />
    <Route path="/report" component={Report} isPrivate isAdmin />

    <Route path="/user" component={DashboardUser} isPrivate isUser />
  </Switch>
);

export default Routes;
