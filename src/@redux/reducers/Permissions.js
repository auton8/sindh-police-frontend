import { SET_PERMISSIONS } from '../../@jumbo/constants/ActionTypes';
import Constants from '../../@services/Constants';

export default (state = Constants.INIT_PERMISSIONS, action) => {
  switch (action.type) {
    case SET_PERMISSIONS: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};
