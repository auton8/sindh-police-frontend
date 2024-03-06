import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Permissions from './Permissions';
import Organizations from './Organizations';
import SelectedOrg from './SelectedOrg';
import Constant from './Constant';
import Sockets from './Sockets';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    permissions: Permissions,
    orgs: Organizations,
    org: SelectedOrg,
    constant: Constant,
    sockets: Sockets
  });
