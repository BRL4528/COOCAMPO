/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import {
  FiBarChart,
  FiLayers,
  FiSliders,
  FiMapPin,
  FiFileText,
  FiSettings,
} from 'react-icons/fi';

import logoImg from '../../../assets/logo.svg';

import { OptionList } from './styles';
import './styles.css';

interface LayoutProps {
  pathname: string;
}

const Sidebar: React.FC<LayoutProps> = ({ pathname }) => {
  console.log(pathname);
  return (
    <>
      <nav className="navbar">
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

          <OptionList pathname={pathname} path="/user" className="nav-item">
            <Link to="user" className="nav-link">
              <FiBarChart color="#f2c811" size={18} />

              <span className="link-text">Dashboard</span>
            </Link>
          </OptionList>

          <OptionList
            pathname={pathname}
            path="/error404-1"
            className="nav-item"
          >
            <Link to="/error404-1" className="nav-link">
              <FiLayers color="#f2c811" size={18} />

              <span className="link-text">Metas e Submetas</span>
            </Link>
          </OptionList>

          <OptionList
            pathname={pathname}
            path="/error404-2"
            className="nav-item"
          >
            <Link to="/error404-2" className="nav-link">
              <FiMapPin color="#f2c811" size={18} />

              <span className="link-text">Setor</span>
            </Link>
          </OptionList>

          <OptionList
            pathname={pathname}
            path="/analytic-module-user"
            className="nav-item"
          >
            <Link to="analytic-module-user" className="nav-link">
              <FiSliders color="#f2c811" size={18} />

              <span className="link-text">Módulos de análise</span>
            </Link>
          </OptionList>

          <OptionList
            pathname={pathname}
            path="/error404-3"
            className="nav-item"
          >
            <Link to="/error404-3" className="nav-link">
              <FiFileText color="#f2c811" size={18} />

              <span className="link-text">Relatório</span>
            </Link>
          </OptionList>

          <OptionList pathname={pathname} path="/import" className="nav-item">
            <Link to="#" className="nav-link">
              <FiSettings color="#f2c811" size={18} />

              <span className="link-text">Configurações</span>
            </Link>
          </OptionList>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
