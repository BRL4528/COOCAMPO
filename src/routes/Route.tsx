import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import SignIn from '../pages/SignIn';
import PainelSatisfactionSurvey from '../pages/AcessGlobal/PainelSatisfactionSurvey';

import LayoutAdm from '../pages/_Layouts/admin';
// import LayoutUser from '../pages/_Layouts/user';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdmin?: boolean;
  isUser?: boolean;
  isGlobal?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  // isUser = false,
  isAdmin = false,
  isGlobal = false,
  component: Component,
  ...rest
}) => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <ReactDOMRoute
        {...rest}
        render={({ location }) => {
          return isPrivate === !!user && isAdmin ? (
            <LayoutAdm path={location.pathname}>
              <Component />
            </LayoutAdm>
          ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/menu',
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }
  if (isGlobal) {
    signOut;
    return (
      <ReactDOMRoute
        {...rest}
        // path="/painel-satisfaction-survey/:analyticId?"
        // component={PainelSatisfactionSurvey}
        path="/painel-module-satisfaction/:analyticId?"
        component={PainelSatisfactionSurvey}
      />
    );
  }
  // return isGlobal ? (
  //   <ReactDOMRoute
  //     {...rest}
  //     path="/painel-satisfaction-survey/:analyticId?"
  //     component={PainelSatisfactionSurvey}
  //   />
  // ) : (
  return <ReactDOMRoute {...rest} path="/" exact component={SignIn} />;
  // );

  // if (user) {
  //   switch (user.tag) {
  //     case 'admin': {
  //       return (
  //         <ReactDOMRoute
  //           {...rest}
  //           render={({ location }) => {
  //             return isPrivate === !!user && isAdmin ? (
  //               <LayoutAdm path={location.pathname}>
  //                 <Component />
  //               </LayoutAdm>
  //             ) : (
  //               <Redirect
  //                 to={{
  //                   pathname: isPrivate ? '/' : '/admin',
  //                   state: { from: location },
  //                 }}
  //               />
  //             );
  //           }}
  //         />
  //       );
  //     }

  //     case 'user': {
  //       return (
  //         <ReactDOMRoute
  //           {...rest}
  //           render={({ location }) => {
  //             return isPrivate === !!user && isUser ? (
  //               <LayoutUser path={location.pathname}>
  //                 <Component />
  //               </LayoutUser>
  //             ) : (
  //               <Redirect
  //                 to={{
  //                   pathname: isPrivate ? '/' : '/user',
  //                   state: { from: location },
  //                 }}
  //               />
  //             );
  //           }}
  //         />
  //       );
  //     }

  //     default:
  //       return isGlobal ? (
  //         <ReactDOMRoute
  //           {...rest}
  //           path="/painel-satisfaction-survey/:analyticId?"
  //           component={PainelSatisfactionSurvey}
  //         />
  //       ) : (
  //         <ReactDOMRoute {...rest} path="/" exact component={SignIn} />
  //       );
  //   }
  // }
  // return isGlobal ? (
  //   <ReactDOMRoute
  //     {...rest}
  //     path="/painel-satisfaction-survey/:analyticId?"
  //     component={PainelSatisfactionSurvey}
  //   />
  // ) : (
  //   <ReactDOMRoute {...rest} path="/" exact component={SignIn} />
  // );
};

export default Route;
