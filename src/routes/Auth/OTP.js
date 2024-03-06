import React from 'react';
import OTPPage from './OTPPage';
import AppLayout from './AppLayout';
import {withRouter} from 'react-router-dom';
const Forgot = (props) => {
  return (
    <AppLayout>
      <OTPPage params={props.location.search} variant="standard" wrapperVariant="bgColor" />
    </AppLayout>
  );
};
export default withRouter(Forgot);
