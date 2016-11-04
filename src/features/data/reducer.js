import { combineReducers } from 'redux';

export const events = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_EVENTS':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_EVENTS':
      return {
        events: {
          ...action.events,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export const event = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_EVENT':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_EVENT':
      return {
        ...action.eventDetails,
        loading: false,
        disabled: action.disabled,
      };
    case 'CLEAR_EVENT':
      return [];
    default:
      return state;
  }
};

export const pastEvents = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_PAST_EVENTS':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_PAST_EVENTS':
      return {
        events: {
          ...action.events,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export const expense = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_EXPENSE':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_EXPENSE':
      return {
        ...action.expense,
        loading: false,
      };
    case 'CLEAR_EXPENSE':
      return [];
    default:
      return state;
  }
};

export const ticket = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_TICKET':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_TICKET':
      return {
        ...action.ticket,
        loading: false,
      };
    case 'CLEAR_TICKET':
      return [];
    default:
      return state;
  }
};

export const common = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_COMMON':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_COMMON_TICKETS':
      return {
        ...state,
        tickets: {
          ...action.common,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  events,
  event,
  ticket,
  expense,
  common,
  pastEvents,
});
