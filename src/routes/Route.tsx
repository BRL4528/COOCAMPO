import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import SignIn from '../pages/SignIn';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdmin?: boolean;
  isUser?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isUser = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  if (user) {
    switch (user.tag) {
      case 'admin': {
        return (
          <ReactDOMRoute
            {...rest}
            render={({ location }) => {
              return isPrivate === !!user && isAdmin ? (
                <Component />
              ) : (
                <Redirect
                  to={{
                    pathname: isPrivate ? '/' : '/admin',
                    state: { from: location },
                  }}
                />
              );
            }}
          />
        );
      }

      case 'user': {
        return (
          <ReactDOMRoute
            {...rest}
            render={({ location }) => {
              return isPrivate === !!user && isUser ? (
                <Component />
              ) : (
                <Redirect
                  to={{
                    pathname: isPrivate ? '/' : '/user',
                    state: { from: location },
                  }}
                />
              );
            }}
          />
        );
      }
      default:
        return <ReactDOMRoute {...rest} path="/" exact component={SignIn} />;
    }
  }
  return <ReactDOMRoute {...rest} path="/" exact component={SignIn} />;
};

export default Route;
