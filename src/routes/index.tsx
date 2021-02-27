import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

// Routes user ADM
import DashboardAdm from '../pages/Dashboard-adm';
import SelectorFolders from '../pages/Dashboard-adm/GoalsSubgoals';
import Email from '../pages/Dashboard-adm/Email';
import Report from '../pages/Dashboard-adm/Report';
import Sector from '../pages/Dashboard-adm/Sector';
import AnalyticModuloAdm from '../pages/Dashboard-adm/AnalyticModule';
import PainelAnalyticModulo from '../pages/Dashboard-adm/PainelAnalyticModule';
import Import from '../pages/Dashboard-adm/Imports';

// Routes user no ADM
import DashboardUser from '../pages/Dashboard-user';
import AnalyticModuloUser from '../pages/Dashboard-user/AnalyticModule';

import Error404 from '../pages/error/404';

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
    <Route path="/import" component={Import} isPrivate isAdmin />
    <Route
      path="/analyticModule"
      component={AnalyticModuloAdm}
      isPrivate
      isAdmin
    />
    <Route
      path="/painel-analytic-module/:goalId?"
      component={PainelAnalyticModulo}
      isPrivate
      isUser
      isAdmin
    />

    <Route path="/user" component={DashboardUser} isPrivate isUser />
    <Route
      path="/analytic-module-user"
      component={AnalyticModuloUser}
      isPrivate
      isUser
    />

    <Route path="/error404-1" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-2" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-3" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-4" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-5" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-6" component={Error404} isPrivate isUser isAdmin />
  </Switch>
);

export default Routes;
