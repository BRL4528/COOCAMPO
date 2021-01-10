/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const Sidebar: React.FC = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <a href="#" className="nav-link">
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

          <li className="nav-item">
            <a href="#" className="nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="svg-inline--fa fa-cat fa-w-16 fa-9x"
              >
                <g className="fa-group">
                  <path
                    d="M2 12V21H6V12H2Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 7V21H22V7H18Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 3V21H14V3H10Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span className="link-text">Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                className="svg-inline--fa fa-cat fa-w-16 fa-9x"
              >
                <g className="fa-group">
                  <path
                    d="M22 18.2222C22 18.6937 21.7893 19.1459 21.4142 19.4793C21.0391 19.8127 20.5304 20 20 20H4C3.46957 20 2.96086 19.8127 2.58579 19.4793C2.21071 19.1459 2 18.6937 2 18.2222V5.77778C2 5.30628 2.21071 4.8541 2.58579 4.5207C2.96086 4.1873 3.46957 4 4 4H9L11 6.66667H20C20.5304 6.66667 21.0391 6.85397 21.4142 7.18737C21.7893 7.52076 22 7.97295 22 8.44444V18.2222Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span className="link-text">Pastas</span>
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="svg-inline--fa fa-cat fa-w-16 fa-9x"
              >
                <g className="fa-group">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span className="link-text">Emails</span>
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="fa-group">
                  <path
                    d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                    fill="#969CBA"
                    fillOpacity="0.2"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 2V9H20"
                    stroke="#1c9cd9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span className="link-text">Relatório</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
