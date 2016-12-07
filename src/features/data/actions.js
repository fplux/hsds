export const START_FETCHING_EVENTS = 'START_FETCHING_EVENTS';
export const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
export const INITIALIZED = 'INITIALIZED';

export const initialized = () => ({
  type: INITIALIZED,
});

export function eventsReceived(events) {
  return function (dispatch) { // eslint-disable-line
    dispatch({ type: 'START_FETCHING_EVENTS' });
    dispatch({
      type: 'RECEIVED_EVENTS',
      events,
    });
  };
}


export const pastEventsReceived = events => ({
  type: 'RECEIVED_PAST_EVENTS',
  events,
});

export const futureEventsReceived = events => ({
  type: 'RECEIVED_FUTURE_EVENTS',
  events,
});

export function fetchEventsForYear(events) {
  return function (dispatch) { // eslint-disable-line
    dispatch({ type: 'START_SETTING_YEAR_EVENTS' });
    dispatch({
      type: 'RECEIVED_YEAR_EVENTS',
      events,
    });
  };
}

export function setYears(years) {
  return function (dispatch) { // eslint-disable-line
    dispatch({ type: 'GET_YEARS' });
    dispatch({
      type: 'RECEIVED_YEARS',
      years,
    });
  };
}

export function fetchPastEvents(events) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_PAST_EVENTS' });
    dispatch({
      type: 'RECEIVED_PAST_EVENTS',
      events,
    });
  };
}


export function fetchEventDetails(eventDetails, disabled) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'REQUEST_EVENT' });
    dispatch({
      type: 'RECEIVED_EVENT',
      eventDetails,
      disabled,
    });
  };
}

export function fetchTicketDetails(ticket) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_TICKET' });
    dispatch({
      type: 'RECEIVED_TICKET',
      ticket,
    });
  };
}

export function fetchCommonTickets(common) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_COMMON' });
    dispatch({
      type: 'RECEIVED_COMMON_TICKETS',
      common,
    });
  };
}

export function setAdminDetails(adminInfo) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_ADMIN' });
    dispatch({
      type: 'RECEIVED_ADMIN_DETAILS',
      adminInfo,
    });
  };
}

export const clearTicket = () => ({
  type: 'CLEAR_TICKET',
});

export function fetchExpenseDetails(expense) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_EXPENSE' });
    dispatch({
      type: 'RECEIVED_EXPENSE',
      expense,
    });
  };
}

export function setUser(user) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'FETCHING_USER' });
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
}

export const logout = () => ({
  type: 'LOGOUT',
});

export const loginerror = () => ({
  type: 'LOGIN_ERROR',
});

export const clearExpense = () => ({
  type: 'CLEAR_EXPENSE',
});

export const clearEvent = () => ({
  type: 'CLEAR_EVENT',
});


export function setData(net, income, expenses, count, revper, avgEvent, avgBandCost, avgVenueCost, numEvents, balData, bluesData, monthlyData) {
  return function (dispatch) { // eslint-disable-line
    dispatch({ type: 'START_SETTING_DATA' });
    dispatch({
      type: 'SET_DATA',
      net,
      income,
      expenses,
      revper,
      count,
      avgEvent,
      avgBandCost,
      avgVenueCost,
      numEvents,
      balData,
      bluesData,
      monthlyData,
    });
  };
}
