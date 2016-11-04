export function fetchEvents(events) {
  return function (dispatch) { //eslint-disable-line
    dispatch({ type: 'START_FETCHING_EVENTS' });
    dispatch({
      type: 'RECEIVED_EVENTS',
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

export const clearExpense = () => ({
  type: 'CLEAR_EXPENSE',
});

export const clearEvent = () => ({
  type: 'CLEAR_EVENT',
});
