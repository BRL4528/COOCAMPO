import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

// Routes user ADM
import Menu from '../pages/Menu';
import DashboardAdm from '../pages/Dashboard-adm';

// PPR
import SelectorFolders from '../pages/Dashboard-adm/GoalsSubgoals';
import Email from '../pages/Dashboard-adm/Email';
import Report from '../pages/Dashboard-adm/Report';
import IcomeStatement from '../pages/Dashboard-adm/Report/IncomeStatement';

import PainelSatisfactionSurveyResult from '../pages/Dashboard-adm/Report/PainelSatisfactionSurveyResult';

import Sector from '../pages/Dashboard-adm/Sector';
import SectorSelected from '../pages/Dashboard-adm/Sector/SelectedSector';
import SectorResume from '../pages/Dashboard-adm/Sector/SectorResume';
import AnalyticModuloAdm from '../pages/Dashboard-adm/AnalyticModule';
import PainelAnalyticModulo from '../pages/Dashboard-adm/PainelAnalyticModule';

import PerformanceEvaluation from '../pages/Dashboard-adm/PerformanceEvaluation';
import ListOfEvaluation from '../pages/Dashboard-adm/PerformanceEvaluation/Evaluations/ListOfEvaluation';
import EvaluationResume from '../pages/Dashboard-adm/PerformanceEvaluation/Evaluations/EvaluationResume';

import PainelSatisfactionSurvey from '../pages/AcessGlobal/PainelSatisfactionSurvey';

import SatisfactionSurvey from '../pages/AcessGlobal/SatisfactionSurvey';

import Import from '../pages/Dashboard-adm/Imports';
import Schedule from '../pages/Dashboard-adm/Schedule';
import ScheduleOnly from '../pages/Dashboard-adm/Schedule/ScheduleUnic';
import Employers from '../pages/Dashboard-adm/Employers';

import Vehicles from '../pages/Dashboard-adm/Vehicles';

import DashboardMiles from '../pages/Dashboard-adm/VehiclesManagement/Dashboard';
import VehiclesSchedule from '../pages/Dashboard-adm/VehiclesManagement/Schedule';
import Kilometers from '../pages/Dashboard-adm/VehiclesManagement/Kilometers';
import KilometersVelho from '../pages/Dashboard-adm/Miles/YouMiles';
import VehiclesSupply from '../pages/Dashboard-adm/VehiclesManagement/Supply';
import VehiclesMaintenance from '../pages/Dashboard-adm/VehiclesManagement/Maintenance';

import FormsOrderService from '../components/Admin/FormsOrderService';

import ServicesOrders from '../pages/Dashboard-adm/ServiceOrders/UserServiceOrders';
import PainelServicesOrders from '../pages/Dashboard-adm/ServiceOrders/PainelServiceOrders';
import ServiceIntegrity from '../pages/Dashboard-adm/ServiceOrders/ServiceIntegrity';
import Monitoring from '../pages/Dashboard-adm/ServiceOrders/Monitoring';

import SelectedNic from '../pages/Dashboard-adm/Rules/SelectedNic';

import Rules from '../pages/Dashboard-adm/Rules';
import Visio from '../pages/Dashboard-adm/Rules/Visio';

import BIManagement from '../pages/Dashboard-adm/BIManagement';

// Routes user no ADM
import DashboardUser from '../pages/Dashboard-user';
import AnalyticModuloUser from '../pages/Dashboard-user/AnalyticModule';

import Error404 from '../pages/error/404';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route
      path="/painel-module-satisfaction/:analyticId?"
      component={PainelSatisfactionSurvey}
      isGlobal
      // isPrivate
      // isAdmin
    />
    <Route
      path="/satisfactionSurvey"
      component={SatisfactionSurvey}
      isGlobal
      isPrivate
      isAdmin
    />

    <Route
      path="/forms-order-service"
      component={FormsOrderService}
      isGlobal
      isPrivate
      isAdmin
    />

    <Route
      path="/bi-management/dashboard"
      component={BIManagement}
      isPrivate
      isAdmin
    />

    <Route
      path="/management-ppr/dashboard"
      component={DashboardAdm}
      isPrivate
      isAdmin
    />

    <Route path="/menu" component={Menu} isPrivate isAdmin />

    <Route
      path="/management-ppr/goals-subgoals"
      component={SelectorFolders}
      isPrivate
      isAdmin
    />
    <Route path="/e-mail" component={Email} isPrivate isAdmin />
    <Route
      path="/management-ppr/report"
      component={Report}
      isPrivate
      isUser
      isAdmin
    />

    <Route
      path="/management-ppr/report-income-statement"
      component={IcomeStatement}
      isPrivate
      isUser
      isAdmin
    />
    <Route
      path="/management-ppr/report-satisfaction-result"
      component={PainelSatisfactionSurveyResult}
      isPrivate
      isUser
      isAdmin
    />
    <Route path="/management-ppr/sector" component={Sector} isPrivate isAdmin />

    <Route
      path="/management-ppr/sector-resume/:sectorId?"
      component={SectorResume}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/sector-selected/:sectorId?"
      component={SectorSelected}
      isPrivate
      isAdmin
    />

    <Route
      path="/rules/sector-resume-rules/:nicId?"
      component={SelectedNic}
      isPrivate
      isAdmin
    />
    <Route path="/management-ppr/import" component={Import} isPrivate isAdmin />
    <Route
      path="/management-ppr/schedule"
      component={Schedule}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/schedule-only:name_schedule?"
      component={ScheduleOnly}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/analyticModule"
      component={AnalyticModuloAdm}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/performance-evaluation/:nick_user"
      component={PerformanceEvaluation}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/listOf-evaluation"
      component={ListOfEvaluation}
      isPrivate
      isAdmin
    />
    <Route
      path="/management-ppr/evaluation-resume/:name_subordinate/:id_hierarchies"
      component={EvaluationResume}
      isPrivate
      isAdmin
      exact
    />

    <Route
      path="/administrator/employers"
      component={Employers}
      isPrivate
      isAdmin
    />

    <Route
      path="/administrator/vehicles"
      component={Vehicles}
      isPrivate
      isAdmin
    />

    <Route
      path="/service-orders/user"
      component={ServicesOrders}
      isPrivate
      isAdmin
    />

    <Route
      path="/service-orders/painel"
      component={PainelServicesOrders}
      isPrivate
      isAdmin
    />

    <Route
      path="/service-orders/service-integrity"
      component={ServiceIntegrity}
      isPrivate
      isAdmin
    />
    <Route
      path="/service-orders/monitoring"
      component={Monitoring}
      isPrivate
      isAdmin
    />

    <Route
      path="/miles/dashboard"
      component={DashboardMiles}
      isPrivate
      isAdmin
    />

    <Route
      path="/miles/schedule"
      component={VehiclesSchedule}
      isPrivate
      isAdmin
    />
    <Route path="/miles/kilometers" component={Kilometers} isPrivate isAdmin />
    <Route
      path="/miles/kilometers-velho"
      component={KilometersVelho}
      isPrivate
      isAdmin
    />
    <Route path="/miles/supply" component={VehiclesSupply} isPrivate isAdmin />
    <Route
      path="/miles/maintenance"
      component={VehiclesMaintenance}
      isPrivate
      isAdmin
    />

    <Route
      path="/management-ppr/painel-module-analytical/:analyticId?"
      component={PainelAnalyticModulo}
      isPrivate
      isUser
      isAdmin
    />

    <Route path="/user" component={DashboardUser} isPrivate isUser />
    <Route
      path="/management-ppr/analytic-module-user"
      component={AnalyticModuloUser}
      isPrivate
      isUser
      isAdmin
    />

    <Route path="/rules" component={Rules} isPrivate isUser isAdmin />

    <Route path="/visio" component={Visio} isPrivate isUser isAdmin />

    <Route path="/error404-1" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-2" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-3" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-4" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-5" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-6" component={Error404} isPrivate isUser isAdmin />
  </Switch>
);

export default Routes;
