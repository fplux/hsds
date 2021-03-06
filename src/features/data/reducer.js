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
        ...state,
        events: action.events,
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

export const admin = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_ADMIN':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_ADMIN_DETAILS':
      return {
        ...action.adminInfo,
        loading: false,
      };
    default:
      return state;
  }
};

export const futureEvents = (state = [], action) => {
  switch (action.type) {
    case 'START_FETCHING_FUTURE_EVENTS':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_FUTURE_EVENTS':
      return {
        events: action.events,
        loading: false,
      };
    default:
      return state;
  }
};

export const yearEvents = (state = [], action) => {
  switch (action.type) {
    case 'START_SETTING_YEAR_EVENTS':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_YEAR_EVENTS':
      return {
        events: action.events,
        loading: false,
      };
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
        events: action.events,
        loading: false,
      };
    default:
      return state;
  }
};

export const years = (state = [], action) => {
  switch (action.type) {
    case 'GET_YEARS':
      return {
        ...state,
        loading: true,
      };
    case 'RECEIVED_YEARS':
      return {
        ...state,
        years: action.years,
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

export const data = (state = [], action) => {
  switch (action.type) {
    case 'START_SETTING_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'SET_DATA':
      return {
        ...state,
        loading: false,
        net: action.net,
        numEvents: action.numEvents,
        income: action.income,
        expenses: action.expenses,
        revper: action.revper,
        count: action.count,
        avgEvent: action.avgEvent,
        avgBandCost: action.avgBandCost,
        avgVenueCost: action.avgVenueCost,
        balData: action.balData,
        bluesData: action.bluesData,
        monthlyData: action.monthlyData,
      };
    default:
      return state;
  }
};

const user = (state = [], action) => {
  switch (action.type) {
    case 'FETCHING_USER':
      return {
        ...state,
        loading: true,
      };
    case 'SET_USER':
      return {
        ...state,
        ...action.user,
        userStatus: 'loggedin',
        loading: false,
        error: '',
      };
    case 'LOGIN_ERROR':
      return {
        error: 'That username or password is not correct',
      };
    case 'LOGOUT':
      return {
        userStatus: 'loggedout',
      };
    default:
      return state;
  }
};

export default combineReducers({
  admin,
  events,
  event,
  years,
  ticket,
  expense,
  common,
  pastEvents,
  futureEvents,
  yearEvents,
  data,
  user,
});
