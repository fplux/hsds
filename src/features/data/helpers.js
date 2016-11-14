import moment from 'moment';
import { firebaseRef } from '../../../firebase';
import * as shared from './shared';
import store from '../../store';
import * as actions from '../data/actions';

const eventsRef = firebaseRef.child('events');

const currentDate = moment().subtract(1, 'days').format('L'); // get the current date
const currentYear = currentDate.split('/')[2];

/* Fetch Events from firebase and set them to the redux store */
export function fetchEvents() {
  const eventsList = {};
  const years = [];
  eventsRef.orderByChild('date').on('value', (snapshot) => {
    const events = snapshot.val();
    Object.keys(events).map((event) => {
      const year = events[event].date.split('/')[2];
      if (years.indexOf(year) === -1 && year <= currentYear) {
        years.push(year);
      }
      eventsList[event] = events[event]; // create an object with all the events in it
      return eventsList;
    });
    store.dispatch(actions.setYears(years));
    store.dispatch(actions.pastEventsReceived(fetchPastEvents(eventsList)));
    store.dispatch(actions.futureEventsReceived(fetchFutureEvents(eventsList)));
    calculateData();
  });
  return eventsList;
}

export function fetchFutureEvents(events) {
  const futureEvents = {};
  Object.keys(events).map((event) => {
    const date = events[event].date;
    if (new Date(date).getTime() > new Date(currentDate).getTime()) {
      futureEvents[event] = events[event];
    }
    return futureEvents;
  });
  return shared.orderEvents(futureEvents, 'ascending');
}

export function fetchPastEvents(events) {
  const pastEvents = {};
  Object.keys(events).map((event) => {
    const date = events[event].date;
    if (new Date(date).getTime() < new Date(currentDate).getTime()) {
      pastEvents[event] = events[event];
    }
    return pastEvents;
  });
  return shared.orderEvents(pastEvents, 'descending');
}

export function calculateData() {
  const events = fetchEventsForYear(currentYear); // fetch all the past events for the current year
  const hbnData = calculateHbnData(events);
  const monthlyData = calculateMonthlyData(events);
  let net = 0;
  let income = 0;
  let expenses = 0;
  let count = 0;
  let revper = 0; // variable for revenue per admission
  let bandExpenses = 0;
  let venueExpenses = 0;
  let countWithBands = 0;
  let countWithVenues = 0;

  const numEvents = Object.keys(events).length;
  Object.keys(events).map((event) => {
    const i = events[event];
    let e;
    for (e in i.expenses) {
      if (i.expenses[e].type === 'Band') {
        bandExpenses += i.expenses[e].cost;
        countWithBands += 1;
      }
      if (i.expenses[e].type === 'Venue') {
        venueExpenses += i.expenses[e].cost;
        countWithVenues += 1;
      }
    }
    net += i.net;
    expenses += i.totalExpenses;
    income += i.totalRevenue;
    count += i.totalCount;
  });
  const avgBandCost = (bandExpenses / countWithBands).toFixed(2);
  const avgVenueCost = (venueExpenses / countWithVenues).toFixed(2);
  const avgEvent = Math.round(count / numEvents);
  revper = (income / count).toFixed(2); // calculate the revenue per person for the year
  store.dispatch(actions.setData(net,
    income,
    expenses,
    count,
    revper,
    avgEvent,
    avgBandCost,
    avgVenueCost,
    numEvents,
    hbnData,
    monthlyData,
  ));
}

export function calculateMonthlyData(events) {
  const monthlyData = {
    numEvents: 0,
    count: 0,
    avgAttendance: 0,
  };
  Object.keys(events).map((event) => {
    const i = events[event];
    if (i.type === 'monthly') {
      monthlyData.numEvents += 1;
      monthlyData.count += i.totalCount;
      monthlyData.avgAttendance = Math.round(monthlyData.count / monthlyData.numEvents);
    }
  });
  return monthlyData;
}

export function calculateHbnData(events) {
  const hbnData = {
    numEvents: 0,
    count: 0,
    avgAttendance: 0,
  };
  Object.keys(events).map((event) => {
    const i = events[event];
    if (i.type === 'hbn') {
      hbnData.numEvents += 1;
      hbnData.count += i.totalCount;
      hbnData.avgAttendance = Math.round(hbnData.count / hbnData.numEvents);
    }
  });
  return hbnData;
}

/* Fetch Events from firebase and set them to the redux store */
export function fetchEventsForYear(year) {
  const events = store.getState().data.events.events;
  const startDate = new Date(`01/01/${year}`).getTime();
  const endDate = new Date(`12/31/${year}`).getTime();
  const pastEventsArr = {};
  Object.keys(events).map((event) => {
    const i = events[event];
    const eventDate = new Date(i.date).getTime();

    if (startDate < eventDate && eventDate < endDate && eventDate < new Date(currentDate).getTime()) {
      pastEventsArr[event] = events[event];
    }
    return pastEventsArr;
  });
  store.dispatch(actions.fetchEventsForYear(shared.orderEvents(pastEventsArr, 'descending')));
  return pastEventsArr;
}
