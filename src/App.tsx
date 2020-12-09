import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './Pages/HomePage';
import GamePage from './Pages/GamePage';
import AccountPage from './Pages/AccountPage';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import AboutPage from './Pages/AboutPage';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './Pages/NotFoundPage';
import AppLayout from './Layouts/AppLayout';
import User from './models/User';


const ProtectedRoute = ({ component, ...args }: any) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em',

        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
          borderRadius: '50px'
        }
      }
    }
  }
});

function App(): JSX.Element {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Router>
            <Switch>
              <Route path="/about" component={AboutPage} />
              <Route path="/" exact component={HomePage} />
              <Route path="/game" component={GamePage} />
              <ProtectedRoute path="/account" component={AccountPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </AppLayout>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;