import { fetchError, fetchStart, fetchSuccess, setOrganizations, setSelectedOrg, setPermissions } from '@redux/actions';
import { setAuthUser, updateLoadUser } from '@redux/actions/Auth';
import Constants from '@services/Constants';
import axios from 'axios';

import moment from 'moment';
let CryptoJS = require('crypto-js');
export const MKV = 'L#2Qe2vQNs$)Rdl*Cd(!';
const sleep = (timeout) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout));
};

const BasicAuth = {
  onLogin: (data) => {
    return async (dispatch) => {
      try {
        dispatch(fetchStart());
        let user = await loginRequest(data);
        if (user.code && user.code === 406) {
          dispatch(fetchError(user.message));
          return;
        }

        user = user.data;
        user.issue_date = moment();
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), MKV).toString();
        localStorage.setItem('cypress_user_1001', ciphertext);
        dispatch(setAuthUser(user));
        if (user) {
          if (user.organizations) {
            dispatch(setOrganizations(user.organizations));
            if (user.organizations.length > 0) {
              let selectedOrg = localStorage.getItem('cypress_selected_org_1001');
              if (selectedOrg) {
                selectedOrg = JSON.parse(selectedOrg);
                if (selectedOrg && user.organizations.some(org => org._id === selectedOrg._id)) {
                  if (selectedOrg.type === 2) {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = false;
                    }
                    dispatch(setPermissions(permsInit));
                    await sleep(500)
                    dispatch(setPermissions(selectedOrg.permissions));
                  } else {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = true;
                    }
                    dispatch(setPermissions(permsInit));
                  }
                  dispatch(setSelectedOrg(selectedOrg));
                } else {
                  if (user.organizations[0] && user.organizations[0].type === 2) {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = false;
                    }
                    dispatch(setPermissions(permsInit));
                    await sleep(500)
                    dispatch(setPermissions(user.organizations[0].permissions));
                  } else {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = true;
                    }
                    dispatch(setPermissions(permsInit));
                  }
                  await sleep(100)
                  dispatch(setSelectedOrg(user.organizations[0]));
                }
              } else {
                let tempOrg = user.organizations[0];
                if (tempOrg) {
                  if (tempOrg.type === 2) {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = false;
                    }
                    dispatch(setPermissions(permsInit));
                    await sleep(500)
                    dispatch(setPermissions(tempOrg.permissions));
                  } else {
                    let permsInit = Constants.INIT_PERMISSIONS;
                    for (let key in permsInit) {
                      permsInit[key] = true;
                    }
                    dispatch(setPermissions(permsInit));
                  }
                  await sleep(100)
                  dispatch(setSelectedOrg(tempOrg));
                }
              }
            }
          } else {
            dispatch(setOrganizations([]));
          }
        }
        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchSuccess());
        dispatch(fetchError(error.message ? error.message : error));
      }
    };
  },
  updateUser: (user) => {
    return async (dispatch) => {
      try {
        dispatch(fetchStart());
        user.issue_date = moment();
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), MKV).toString();
        localStorage.setItem('cypress_user_1001', ciphertext);
        dispatch(setAuthUser(user));
        dispatch(setOrganizations(user.organizations));
        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchSuccess());
        dispatch(fetchError(error.message ? error.message : error));
      }
    };
  },
  onRegister: (data) => {
    return async (dispatch) => {
      try {
        dispatch(fetchStart());
        let user = await signupRequest(data);
        // user.issue_date = moment()
        // let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), MKV).toString();
        // localStorage.setItem('cypress_user_1001', ciphertext);
        // dispatch(setAuthUser(user));
        // if (user) {
        //   if (user.organizations) {
        //     dispatch(setOrganizations(user.organizations));
        //     if (user.organizations.length > 0) {
        //       dispatch(setSelectedOrg(user.organizations[0]))
        //       // if (user.organizations[0].type === 2) {
        //       //   dispatch(setPermissions(user.organizations[0].permissions))
        //       // }
        //     }
        //   } else {
        //     dispatch(setOrganizations([]));
        //   }
        // }
        dispatch(fetchSuccess());
      } catch (error) {
        dispatch(fetchSuccess());
        dispatch(fetchError(error.message ? error.message : error));
      }
    };
  },
  onLogout: () => {
    return (dispatch) => {
      dispatch(fetchStart());
      setTimeout(() => {
        localStorage.removeItem('cypress_user_1001');
        // localStorage.removeItem('cypress_selected_org_1001');
        dispatch(setAuthUser(null));
        dispatch(setOrganizations([]));
        dispatch(fetchSuccess());
        // window.location.reload();
        window.history.pushState({}, document.title, '/');
      }, 300);
    };
  },

  getAuthUser: (loaded = false) => {
    let iTem = localStorage.getItem('cypress_user_1001');
    let selectedOrg = localStorage.getItem('cypress_selected_org_1001');

    let bytes = iTem ? CryptoJS.AES.decrypt(iTem, MKV).toString(CryptoJS.enc.Utf8) : null;
    let user = bytes ? JSON.parse(bytes) : null;

    let validate = checkIfUserCanContiune(user);
    if (!validate.isNull) {
      if (validate.isExpired) {
        user = null;
      }
    } else {
      user = null;
    }

    return async (dispatch) => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      if (selectedOrg && user) {
        selectedOrg = JSON.parse(selectedOrg);
        if (selectedOrg && user.organizations.some(org => org._id === selectedOrg._id)) {
          if (selectedOrg.type === 2) {
            let permsInit = Constants.INIT_PERMISSIONS;
            for (let key in permsInit) {
              permsInit[key] = false;
            }
            dispatch(setPermissions(permsInit));
            await sleep(600)
            dispatch(setPermissions(selectedOrg.permissions));
          } else {
            let permsInit = Constants.INIT_PERMISSIONS;
            for (let key in permsInit) {
              permsInit[key] = true;
            }
            dispatch(setPermissions(permsInit));
          }
          await sleep(100)
          dispatch(setSelectedOrg(selectedOrg));
        } else {
          let permsInit = Constants.INIT_PERMISSIONS;
          for (let key in permsInit) {
            permsInit[key] = true;
          }
          dispatch(setPermissions(permsInit));
        }
      } else {
        let permsInit = Constants.INIT_PERMISSIONS;
        for (let key in permsInit) {
          permsInit[key] = true;
        }
        dispatch(setPermissions(permsInit));
      }
      dispatch(setAuthUser(user));
      if (user) {
        dispatch(setOrganizations(user.organizations ? user.organizations : []));
      }
      dispatch(fetchSuccess());
    };
  },
};

function checkIfUserCanContiune(user) {
  let result = { isNull: true, isExpired: false };
  if (user) {
    result.isNull = false;
    let issueDate = moment(user.issue_date);
    let current_date = moment();
    let duration = current_date.diff(issueDate, 'minutes');
    if (duration > 30) result.isExpired = true;
  }
  return result;
}

async function loginRequest(data) {
  return new Promise((resolve, reject) => {
    axios
      .create()
      .post('/auth/login', data)
      .then((ans) => {
        ans = ans.data;
        if (ans.status) {
          resolve(ans);
        } else {
          reject(ans.message);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

async function signupRequest(data) {
  return new Promise((resolve, reject) => {
    axios
      .create()
      .post('/auth/signup', data)
      .then((ans) => {
        ans = ans.data;

        if (ans.status) {
          resolve(ans.data);
        } else {
          reject(ans.message);
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default BasicAuth;
