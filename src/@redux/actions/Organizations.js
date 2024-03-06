import {SET_ORGS, UPDATE_ORGS} from '@jumbo/constants/ActionTypes';

export const setOrganizations = (orgs) => {
  return (dispatch) => {
    dispatch({
      type: SET_ORGS,
      payload: orgs,
    });
  };
};

export const updateOrganizations = (orgs) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ORGS,
      payload: orgs,
    });
  };
};
