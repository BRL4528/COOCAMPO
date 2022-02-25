import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

// Routes user ADM
import Dashboard from '../pages/Dashboard';
import DashboardPPR from '../pages/Dashboard/ppr_management/Dashboard';

// PPR
import SelectorFolders from '../pages/Dashboard/ppr_management/GoalsSubgoals';
import Email from '../pages/Dashboard/ppr_management/Email';
import Report from '../pages/Dashboard/ppr_management/Report';
import IcomeStatement from '../pages/Dashboard/ppr_management/Report/IncomeStatement';

import PainelSatisfactionSurveyResult from '../pages/Dashboard/ppr_management/Report/PainelSatisfactionSurveyResult';

import Sector from '../pages/Dashboard/ppr_management/Sector';
import SectorSelected from '../pages/Dashboard/ppr_management/Sector/SelectedSector';
import SectorResume from '../pages/Dashboard/ppr_management/Sector/SectorResume';
import AnalyticModuloAdm from '../pages/Dashboard/ppr_management/AnalyticModule';
import PainelAnalyticModulo from '../pages/Dashboard/ppr_management/PainelAnalyticModule';

import PerformanceEvaluation from '../pages/Dashboard/ppr_management/PerformanceEvaluation';
import ListOfEvaluation from '../pages/Dashboard/ppr_management/PerformanceEvaluation/Evaluations/ListOfEvaluation';
import EvaluationResume from '../pages/Dashboard/ppr_management/PerformanceEvaluation/Evaluations/EvaluationResume';

import PainelSatisfactionSurvey from '../pages/AcessGlobal/PainelSatisfactionSurvey';

import SatisfactionSurvey from '../pages/AcessGlobal/SatisfactionSurvey';

import Import from '../pages/Dashboard/ppr_management/Imports';
import Schedule from '../pages/Dashboard/ppr_management/Schedule';
import ScheduleOnly from '../pages/Dashboard/ppr_management/Schedule/ScheduleUnic';
import Employers from '../pages/Dashboard/ppr_management/Employers';

import Vehicles from '../pages/Dashboard/vehicles_management/Vehicles';

import DashboardMiles from '../pages/Dashboard/vehicles_management/Dashboard';
import VehiclesSchedule from '../pages/Dashboard/vehicles_management/Schedule';
import Kilometers from '../pages/Dashboard/vehicles_management/Kilometers';
import KilometersVelho from '../pages/Dashboard/Miles-velho/YouMiles';
import VehiclesSupply from '../pages/Dashboard/vehicles_management/Supply';
import VehiclesMaintenance from '../pages/Dashboard/vehicles_management/Maintenance';

import FormsOrderService from '../components/Admin/FormsOrderService';

import ServicesOrders from '../pages/Dashboard/service_orders/UserServiceOrders';
import PainelServicesOrders from '../pages/Dashboard/service_orders/PainelServiceOrders';
import ServiceIntegrity from '../pages/Dashboard/service_orders/ServiceIntegrity';
import Monitoring from '../pages/Dashboard/service_orders/Monitoring';

import SelectedNic from '../pages/Dashboard/ppr_management/Rules/SelectedNic';

import Rules from '../pages/Dashboard/ppr_management/Rules';
import Visio from '../pages/Dashboard/ppr_management/Rules/Visio';

// BI
import BIManagement from '../pages/Dashboard/BIManagement';
import BIEnergY from '../pages/Dashboard/BIManagement/energiBi';
import BIFleet from '../pages/Dashboard/BIManagement/fleetBi';
import BIOrders from '../pages/Dashboard/BIManagement/ordersBi';

// Profile
import Profile from '../pages/Dashboard/_Profile';

import Error404 from '../pages/error/404';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route isPrivate isAdmin path="/profile" component={Profile} />
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
      path="/management-ppr/dashboard"
      component={DashboardPPR}
      isPrivate
      isAdmin
    />

    <Route path="/menu" component={Dashboard} isPrivate isAdmin />

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

    <Route path="/rules" component={Rules} isPrivate isUser isAdmin />

    <Route path="/visio" component={Visio} isPrivate isUser isAdmin />

    {/* BI */}
    <Route
      path="/bi-management/dashboard"
      component={BIManagement}
      isPrivate
      isAdmin
    />

    <Route
      path="/bi-management/energy"
      component={BIEnergY}
      isPrivate
      isAdmin
    />
    <Route
      path="/bi-management/orders"
      component={BIOrders}
      isPrivate
      isAdmin
    />

    <Route path="/bi-management/fleet" component={BIFleet} isPrivate isAdmin />

    <Route path="/error404-1" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-2" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-3" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-4" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-5" component={Error404} isPrivate isUser isAdmin />
    <Route path="/error404-6" component={Error404} isPrivate isUser isAdmin />
  </Switch>
);

export default Routes;
