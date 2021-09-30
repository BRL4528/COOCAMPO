/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBarChart,
  FiLayers,
  FiSliders,
  FiMapPin,
  FiUsers,
  FiFileText,
  FiFilePlus,
  FiPieChart,
  FiTerminal,
  FiClock,
  FiList,
  FiCoffee,
  FiCompass,
  FiCalendar,
  FiHeart,
} from 'react-icons/fi';

import { BiCar, BiGasPump } from 'react-icons/bi';
import { GiAutoRepair } from 'react-icons/gi';
import { OptionList } from './styles';

export function ManagementMiles(
  pathname: string,
  user: {
    dashboard: boolean;
    goals_and_sub_goals: boolean;
    sector: boolean;
    employers: boolean;
    module_analyze: boolean;
    imports: boolean;
    report: boolean;
    schedule: boolean;
  },
) {
  return (
    <>
      <OptionList pathname={pathname} path="/menu" className="nav-item" visible>
        <Link to="/menu" className="nav-link">
          <FiList color="#f2c811" size={16} />

          <span className="link-text">Menu inicial</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/your-miles/schedule"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/your-miles/schedule" className="nav-link">
          <FiCalendar color="#f2c811" size={16} />

          <span className="link-text">Agenda</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/your-miles/miles"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/your-miles/miles" className="nav-link">
          <FiCompass color="#f2c811" size={16} />

          <span className="link-text">Quilometragem</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/your-miles/supply"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/your-miles/supply" className="nav-link">
          <BiGasPump color="#f2c811" size={16} />

          <span className="link-text">Abastecimento</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/your-miles/maintenance"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/your-miles/maintenance" className="nav-link">
          <GiAutoRepair color="#f2c811" size={16} />

          <span className="link-text">Manutenção</span>
        </Link>
      </OptionList>
    </>
  );
}

export function ManagementPPR(
  pathname: string,
  user: {
    dashboard: boolean;
    goals_and_sub_goals: boolean;
    sector: boolean;
    employers: boolean;
    module_analyze: boolean;
    imports: boolean;
    report: boolean;
    schedule: boolean;
  },
) {
  return (
    <>
      <OptionList pathname={pathname} path="/menu" className="nav-item" visible>
        <Link to="/menu" className="nav-link">
          <FiList color="#f2c811" size={16} />

          <span className="link-text">Menu inicial</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/dashboard"
        className="nav-item"
        visible={user.dashboard}
      >
        <Link to="/management-ppr/dashboard" className="nav-link">
          <FiBarChart color="#f2c811" size={16} />

          <span className="link-text">Dashboard</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/goals-subgoals"
        className="nav-item"
        visible={user.goals_and_sub_goals}
      >
        <Link to="/management-ppr/goals-subgoals" className="nav-link">
          <FiLayers color="#f2c811" size={16} />

          <span className="link-text">Metas e Submetas</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/sector"
        className="nav-item"
        visible={user.sector}
      >
        <Link to="/management-ppr/sector" className="nav-link">
          <FiMapPin color="#f2c811" size={16} />

          <span className="link-text">Setor</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/analyticModule"
        className="nav-item"
        visible={user.module_analyze}
      >
        <Link to="/management-ppr/analyticModule" className="nav-link">
          <FiSliders color="#f2c811" size={16} />
          <span className="link-text">Módulos de análise</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/import"
        className="nav-item"
        visible={user.imports}
      >
        <Link to="/management-ppr/import" className="nav-link">
          <FiFilePlus color="#f2c811" size={16} />
          <span className="link-text">Importações</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/error404-3"
        className="nav-item"
        visible={user.report}
      >
        <Link to="/management-ppr/report" className="nav-link">
          <FiFileText color="#f2c811" size={16} />

          <span className="link-text">Relatório</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/error404-5"
        className="nav-item"
        visible={false}
      >
        <Link to="/error404-5" className="nav-link">
          <FiPieChart color="#f2c811" size={16} />

          <span className="link-text">Gráficos</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/management-ppr/schedule"
        className="nav-item"
        visible={user.schedule}
      >
        <Link to="/management-ppr/schedule" className="nav-link">
          <FiTerminal color="#f2c811" size={16} />

          <span className="link-text">Agenda</span>
        </Link>
      </OptionList>
    </>
  );
}

export function OrderServices(
  pathname: string,
  // eslint-disable-next-line no-unused-vars
  user: {
    tag: string;
    dashboard: boolean;
    goals_and_sub_goals: boolean;
    sector: boolean;
    employers: boolean;
    module_analyze: boolean;
    imports: boolean;
    report: boolean;
    schedule: boolean;
  },
) {
  return (
    <>
      <OptionList pathname={pathname} path="/menu" className="nav-item" visible>
        <Link to="/menu" className="nav-link">
          <FiList color="#f2c811" size={16} />

          <span className="link-text">Menu inicial</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/service-orders/service-integrity"
        className="nav-item"
        visible
      >
        <Link to="/service-orders/service-integrity" className="nav-link">
          <FiHeart color="#f2c811" size={16} />

          <span className="link-text">Integridade dos serviços</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/service-orders/user"
        className="nav-item"
        visible={user.tag === 'admin' || user.tag === 'user'}
      >
        <Link to="/service-orders/user" className="nav-link">
          <FiClock color="#f2c811" size={16} />

          <span className="link-text">Ordens de serviço - TI</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/service-orders/painel"
        className="nav-item"
        visible={user.tag === 'admin' || user.tag === 'admin-os'}
      >
        <Link to="/service-orders/painel" className="nav-link">
          <FiCoffee color="#f2c811" size={16} />

          <span className="link-text">Painel ordens de serviço</span>
        </Link>
      </OptionList>
    </>
  );
}

export function Addministrator(
  pathname: string,
  user: {
    dashboard: boolean;
    goals_and_sub_goals: boolean;
    sector: boolean;
    employers: boolean;
    module_analyze: boolean;
    imports: boolean;
    report: boolean;
    schedule: boolean;
  },
) {
  return (
    <>
      <OptionList pathname={pathname} path="/menu" className="nav-item" visible>
        <Link to="/menu" className="nav-link">
          <FiList color="#f2c811" size={16} />

          <span className="link-text">Menu inicial</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/administrator/employers"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/administrator/employers" className="nav-link">
          <FiUsers color="#f2c811" size={16} />

          <span className="link-text">Colaboradores</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/administrator/vehicles"
        className="nav-item"
        visible={user.employers}
      >
        <Link to="/administrator/vehicles" className="nav-link">
          <BiCar color="#f2c811" size={16} />

          <span className="link-text">Veículos</span>
        </Link>
      </OptionList>
    </>
  );
}

export function Rules(pathname: string) {
  return (
    <>
      <OptionList pathname={pathname} path="/menu" className="nav-item" visible>
        <Link to="/menu" className="nav-link">
          <FiList color="#f2c811" size={16} />

          <span className="link-text">Menu inicial</span>
        </Link>
      </OptionList>

      <OptionList
        pathname={pathname}
        path="/rules"
        className="nav-item"
        visible
      >
        <Link to="/rules" className="nav-link">
          <FiFileText color="#f2c811" size={16} />

          <span className="link-text">Normas interna</span>
        </Link>
      </OptionList>
    </>
  );
}
