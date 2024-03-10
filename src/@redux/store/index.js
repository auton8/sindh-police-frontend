import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Fixed thunk import
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducers from '../reducers';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

function configureStore(initialState = {}) {
  const middlewares = [thunk, routeMiddleware]; // Thunk middleware pehle include karein
  const storeEnhancers = applyMiddleware(...middlewares);

  const store = createStore(reducers(history), initialState, storeEnhancers);
  return store;
}

export default configureStore;
export { history };
