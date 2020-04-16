import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';

interface IProps {
  component: any;
  path: any;
}

export const PrivateRoute = ({ component: Component, path }: IProps) => {
  return (
    <Route
      path={path}
      render={(props) => (
        <Fragment>
          <AppBar />
          <Component {...props} />
        </Fragment>
      )}
    />
  );
};

export default PrivateRoute;
