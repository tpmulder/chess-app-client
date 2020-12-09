import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

import './assets/scss/global.scss';
import 'fontsource-roboto';
import { createBrowserHistory } from 'history';
import User from './models/User';
import { UserProvider } from './contexts/UserContext';

export const history = createBrowserHistory();

export const UserContext = React.createContext<User | null>(null);

const scopes = `${process.env.REACT_APP_AUTH0_SCOPES}`.split('-').join(' ');

ReactDOM.render( 
  <Auth0Provider 
    domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`} 
    clientId={`${process.env.REACT_APP_AUTH0_ID}`} 
    audience={`${process.env.REACT_APP_AUTH0_AUDIENCE}`} 
    redirectUri={window.location.origin} 
    scope={scopes}
    cacheLocation='localstorage'
    useRefreshTokens={true}
  >
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

reportWebVitals();
