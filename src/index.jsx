import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import firebase from '../firebase';
import app from './features/app';
import * as actions from './features/data/actions';

store.dispatch(actions.initialized());

const requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/login');
  }
  next();
};

const redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/edit');
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
  PastEventsContainer,
  ReportsContainer,
  YearReportContainer,
  DashboardContainer } = app.components;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={DashboardContainer} />
        <Route path="/events" component={EventsListContainer} />
        <Route path="/past" component={PastEventsContainer} />
        <Route path="/new" component={AddEvent} />
        <Route path="/reports" component={ReportsContainer} />
        <Route path="/reports/:year" component={YearReportContainer} />
        <Route path="events/:id" component={EventDetailContainer} />
        <Route path="events/:id/addticket" component={AddTicketContainer} />
        <Route path="events/:id/addexpense" component={AddExpense} />
        <Route path="events/:id/edit" component={EditEventContainer} />
        <Route path="events/:id/editticket/:ticketid" component={EditTicketContainer} />
        <Route path="events/:id/editexpense/:expenseid" component={EditExpenseContainer} />
      </Route>
    </Router>
  </Provider>,
    document.getElementById('app')
  );
