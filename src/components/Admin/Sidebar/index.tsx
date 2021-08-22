/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router-dom';

import { FiSettings } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';

import logoImg from '../../../assets/logo.svg';

import {
  ManagementPPR,
  OrderServices,
  Addministrator,
} from './listMenuSidebar';

import { OptionList } from './styles';
import './styles.css';

interface LayoutProps {
  pathname: string;
}

const Sidebar: React.FC<LayoutProps> = ({ pathname }) => {
  const { user } = useAuth();
  const location = useLocation();

  function sideBarRenderized() {
    if (location.pathname.substring(0, 15) === '/management-ppr') {
      return ManagementPPR(pathname, user);
    }
    if (location.pathname.substring(0, 15) === '/service-orders') {
      return OrderServices(pathname, user);
    }
    if (location.pathname.substring(0, 14) === '/administrator') {
      return Addministrator(pathname, user);
    }
    return <div>Nada</div>;
  }

  return (
    <>
      <nav id="noPrint" className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <a href="#" className="nav-header">
              <span className="link-text logo-text">
                <img className="img-logo" src={logoImg} alt="Samasc" />
              </span>
              <svg
                width="24"
                height="24"
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  />
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  />
                </g>
              </svg>
            </a>
          </li>
          {sideBarRenderized()}

          <OptionList
            pathname={pathname}
            path="/import"
            className="nav-item"
            visible
          >
            <button
              type="button"
              onClick={() => console.log('teste')}
              className="nav-link"
            >
              <FiSettings color="#f2c811" size={16} />

              <span className="link-text">Configurações</span>
            </button>
          </OptionList>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
