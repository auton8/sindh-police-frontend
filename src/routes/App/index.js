import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import AppLayout from './AppLayout';
import Dashboard from './Dashboard';

const Routes = () => {
  const requestedUrl = '/app/';
  const [routes, setRoutes] = useState([]);
  const prePermissions = useSelector(({ permissions }) => permissions);

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = () => {
    setTimeout(() => {
      let tempRoutes = [];
      tempRoutes.push(<Route path={requestedUrl + `dashboard`} component={Dashboard} />);
      setRoutes(tempRoutes);
    }, 1000);
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {routes}
        <Route component={lazy(() => import('./404'))} />
      </Switch>
    </Suspense>
  );
};

export default withRouter(Routes);
