import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

import './assets/scss/global.scss';
import 'fontsource-roboto';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

// const onRedirectCallback = (appState: any) => {
//   const history = useHistory()
//   history.replace(appState?.returnTo || window.location.pathname);
// };

ReactDOM.render( 
  <Auth0Provider 
    domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`} 
    clientId={`${process.env.REACT_APP_AUTH0_CLIENT_ID}`} 
    audience={`${process.env.REACT_APP_AUTH0_CLIENT_AUDIENCE}`} 
    redirectUri={window.location.origin} 
    scope='read:users update:users'
    cacheLocation='localstorage'
    useRefreshTokens={true}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

reportWebVitals();
