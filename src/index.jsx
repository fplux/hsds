import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import firebase from '../firebase';
import app from './features/app';
import * as actions from './features/data/actions';

store.dispatch(actions.initialized());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    hashHistory.push('/');
  } else {
    hashHistory.push('/login');
  }
});

const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
  }
  next();
};

const redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

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
  Login } = app.components;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={DashboardContainer} onEnter={requireLogin} />
        <Route path="/login" component={Login} onEnter={redirectIfLoggedIn} />
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
    </Router>
  </Provider>,
    document.getElementById('app')
  );
