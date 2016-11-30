import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import firebase from '../firebase';
import app from './features/app';
import * as actions from './features/data/actions';

/* Initial actions, including setting the logged in user and getting all events */
store.dispatch(actions.initialized());

/* Detecting a state change when the user changes */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    hashHistory.push('/');
  } else {
    hashHistory.push('/login');
  }
});

/* If the user is not logged in, we want to send them to the login page */
const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
  }
  next();
};

/* If the user is logged in, we will direct them to the main page */
const redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

/* Declare all compnents */
const {
  App,
  EventsListContainer,
  EventDetailContainer,
  EditEventContainer,
  AddTicketContainer,
  EditTicketContainer,
  EditExpenseContainer,
  AddExpense,
  AddEvent,
  ReportsContainer,
  YearReportContainer,
  DashboardContainer,
  LoginContainer } = app.components;

/* Define routes for administrators */
const adminUserRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={DashboardContainer} onEnter={requireLogin} />
    <Route path="/login" component={LoginContainer} onEnter={redirectIfLoggedIn} />
    <Route path="/events" component={EventsListContainer} onEnter={requireLogin} />
    <Route path="/new" component={AddEvent} onEnter={requireLogin} />
    <Route path="/reports" component={ReportsContainer} onEnter={requireLogin} />
    <Route path="/reports/:year" component={YearReportContainer} onEnter={requireLogin} />
    <Route path="events/:id" component={EventDetailContainer} onEnter={requireLogin} />
    <Route path="events/:id/addticket" component={AddTicketContainer} onEnter={requireLogin} />
    <Route path="events/:id/addexpense" component={AddExpense} onEnter={requireLogin} />
    <Route path="events/:id/edit" component={EditEventContainer} onEnter={requireLogin} />
    <Route path="events/:id/editticket/:ticketid" component={EditTicketContainer} onEnter={requireLogin} />
    <Route path="events/:id/editexpense/:expenseid" component={EditExpenseContainer} onEnter={requireLogin} />
  </Route>
);
/* End Administrator Routes */


/* Render application using react router */
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {adminUserRoutes()}
    </Router>
  </Provider>,
    document.getElementById('app')
  );
