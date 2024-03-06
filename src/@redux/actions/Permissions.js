import { SET_PERMISSIONS } from '@jumbo/constants/ActionTypes';
import Constants from '@services/Constants';

export const setPermissions = (permissions) => {
  return (dispatch) => {
    let data = { type: SET_PERMISSIONS };
    if (permissions) {
      data.payload = permissions;
    } else {
      data.payload = Constants.INIT_PERMISSIONS;
    }

    dispatch(data);
  };
};
