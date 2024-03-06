import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {Switch} from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import configureStore, {history} from './@redux/store';
import AppWrapper from './@jumbo/components/AppWrapper';
import AppContextProvider from './@jumbo/components/contextProvider/AppContextProvider';
import Routes from './routes';
import {PublicClientApplication} from '@azure/msal-browser'; // feature/task_microauth
import {MsalProvider} from '@azure/msal-react'; // feature/task_microauth
import {msalConfig} from './authConfig'; // feature/task_microauth
const msalInstance = new PublicClientApplication(msalConfig); // feature/task_microauth
export const store = configureStore();


const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContextProvider>
            <AppWrapper>
              <Switch>
                <Routes />
              </Switch>
            </AppWrapper>
          </AppContextProvider>
        </ConnectedRouter>
      </Provider>
  
    </MsalProvider>
  );};

export default App;
