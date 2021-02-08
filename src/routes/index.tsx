import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import DashboardAdm from '../pages/Dashboard-adm';
import SelectorFolders from '../pages/Dashboard-adm/GoalsSubgoals';
import Email from '../pages/Dashboard-adm/Email';
import Report from '../pages/Dashboard-adm/Report';
import Sector from '../pages/Dashboard-adm/Sector';
import AnalyticModulo from '../pages/Dashboard-adm/AnalyticModule';
import PainelAnalyticModulo from '../pages/Dashboard-adm/PainelAnalyticModule';

import DashboardUser from '../pages/Dashboard-user';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/admin" component={DashboardAdm} isPrivate isAdmin />
    <Route
      path="/goals-subgoals"
      component={SelectorFolders}
      isPrivate
      isAdmin
    />
    <Route path="/e-mail" component={Email} isPrivate isAdmin />
    <Route path="/report" component={Report} isPrivate isAdmin />
    <Route path="/sector" component={Sector} isPrivate isAdmin />
    <Route
      path="/analyticModule"
      component={AnalyticModulo}
      isPrivate
      isAdmin
    />
    <Route
      path="/painel-analytic-module/:goalId?"
      component={PainelAnalyticModulo}
      isPrivate
      isUser
    />

    <Route path="/user" component={DashboardUser} isPrivate isUser />
  </Switch>
);

export default Routes;
