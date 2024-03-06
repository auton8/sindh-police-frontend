import React from 'react';
import ForgotPasswordPage from './ResetPasswordPage';
import AppLayout from './AppLayout';
import {withRouter} from 'react-router-dom';
const Forgot = (props) => {
  return (
    <AppLayout>
      <ForgotPasswordPage params={props.location.state} variant="standard" wrapperVariant="bgColor" />
    </AppLayout>
  );
};
export default withRouter(Forgot);
