import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Password from './Auth/Forgot';
import forgotpass from './Auth/OTP';
import OTPNew from './Auth/OTPNew';
import ResetPassword from './Auth/ResetPassword';
import App from './App';
import { socketConfig } from '@redux/actions/Sockets';
import AxiosInterceptor from '@services/AxiosInterceptor';
const RestrictedRoute = ({ authUser, ...rest }) => {
  var Comp = undefined;
  if (authUser) {
    Comp = <App />;
  } else {
    sessionStorage.removeItem('cypress_user_1001');
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return Comp ? (
          Comp
        ) : (
          <Redirect
            to={{
              pathname: '/login/?action_url=' + window.location.pathname,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const match = useRouteMatch();
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {// load web socket connection only one time
      dispatch(socketConfig(authUser))
    }, 3000);
  }, [authUser])

  return (
    <React.Fragment>
      <Switch>
        <Redirect to={'/login'} path="/" exact component={Login} />
        <Route path="/login/:id?" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot" component={Password} />
        <Route path="/otp" component={OTPNew} />
        <Route path="/forgotpass" component={forgotpass} />
        <Route path="/resetpassword" component={ResetPassword} />
        <RestrictedRoute path={`${match.url}app`} authUser={authUser} />
        <Route component={Error404} />
      </Switch>
      <AxiosInterceptor />
    </React.Fragment>
  );
};

export default withRouter(Routes);
