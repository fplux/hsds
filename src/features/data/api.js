import moment from 'moment';
import { firebaseRef } from '../../../firebase';
import * as actions from '../data/actions';
import store from '../../store';

/* Firebase References */

const eventsRef = firebaseRef.child('events');

// Add Event
export function addEvent(newEvent) {
  eventsRef.push().set(newEvent);
}

export function deleteEvent(eventId) {
  eventsRef.child(eventId).remove();
}

/* Function to sort array in ascending order */
export function sortArrayAscending(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

/* Function to sort array in descending order */
export function sortArrayDescending(b, a) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

// Function order events given a direction
export function orderEvents(events, direction) {
  // Create an array of the returned events
  const eventsList = events;
  const eventsArray = [];
  Object.keys(eventsList).map((event) => { //eslint-disable-line
    eventsList[event].id = event;
    eventsArray.push(eventsList[event]);
  });

  // Sort the events
  if (direction === 'ascending') {
    eventsArray.sort(sortArrayAscending);
  } else {
    eventsArray.sort(sortArrayDescending);
  }

  // Send the objects back into an object
  const eventsObject = {};
  eventsArray.map((event) => { //eslint-disable-line
    eventsObject[event.id] = event;
  });

  return eventsObject;
}


/* Fetch Events from firebase and set them to the redux store */
export function fetchEvents() {
  const currentDate = moment().subtract(1, 'days').format('L');
  eventsRef.orderByChild('date').startAt(currentDate).on('value', (snapshot) => {
    const events = snapshot.val();
    const direction = 'ascending';
    const eventsObject = orderEvents(events, direction);

    store.dispatch(actions.fetchEvents(eventsObject));
  });
}

/* Fetch Eventes from firebase that have occured before todays date */
export function fetchPastEvents() {
  const currentDate = moment().subtract(1, 'days').format('L');
  eventsRef.orderByChild('date').endAt(currentDate).on('value', (snapshot) => {
    const events = snapshot.val();

    const direction = 'descending';
    const eventsObject = orderEvents(events, direction);

    store.dispatch(actions.fetchPastEvents(eventsObject));
  });
}


/* Fetch event details given an ID parameter */
export function fetchEventDetails(id) {
  eventsRef.orderByKey().equalTo(id).on('value', (snapshot) => {
    const events = snapshot.val() || {};
    const parsedEvents = [];
    Object.keys(events).forEach((event) => { // Iterate through event and push it to an array
      parsedEvents.push({
        ...events[event],
      });
    });
    const disabled = parsedEvents[0].date < moment().format('L');
    store.dispatch(actions.fetchEventDetails(parsedEvents, disabled));
  });
}

export function editEventDetails(id, eventDetails) {
  const eventRef = eventsRef.child(id);
  eventRef.update(eventDetails);
  updateExpenses(id);
  updateCash(id);
}


/* Add ticket */
export function addTicket(eventId, newTicket) {
  const eventTickets = eventsRef.child(eventId).child('tickets');
  const newTicketKey = eventTickets.push().key;
  eventTickets.child(newTicketKey).update(newTicket);
}

export function deleteTicket(eventId, ticketId) {
  eventsRef.child(eventId).child('tickets').child(ticketId).remove();
}

export function fetchCommonTickets() {
  const common = [];
  firebaseRef.child('tickets').on('value', (snapshot) => {
    const tickets = snapshot.val() || '';
    Object.keys(tickets).forEach((ticket) => { // Iterate through event and push it to an array
      common.push({
        ...tickets[ticket],
      });
    });
    store.dispatch(actions.fetchCommonTickets(common));
  });
}


// Fetch ticket details given a ticket ID
export function fetchTicketDetails(id, ticketid) {
  eventsRef
  .child(id)
  .child('tickets')
  .child(ticketid)
  .on('value', (snapshot) => {
    const tickets = snapshot.val() || {};
    store.dispatch(actions.fetchTicketDetails(tickets));
  });
}
// Edit the details of a particuar ticket, given a ticket ID
export function editTicketDetails(id, ticketid, ticketDetails) {
  const eventRef = eventsRef.child(id);
  const ticketsRef = eventRef.child('tickets');
  const ticketRef = ticketsRef.child(ticketid);
  ticketRef.update(ticketDetails);
  updateTotals(id);
}


// Function to modify tickets (increase or decrease)
export function modifyTicket(eventId, typeId, count, price, edit) {
    // Set firebase references
  const eventRef = eventsRef.child(eventId);
  const ticketsRef = eventRef.child('tickets');
  const ticketRef = ticketsRef.child(typeId);

  let newCount;
  if (edit === 'add') { // check if add
    newCount = count + 1;
  } else if (edit === 'remove') { // check if remove
    newCount = count - 1;
  }

  // set the new total
  const newTotal = newCount * price;

  // Update the ticket in the database
  ticketRef.update({
    count: newCount,
    total: newTotal,
  });

  updateTotals(eventId);
  updateCash(eventId);
  updateExpenses(eventId);
}

function updateTotals(eventId) {
  const eventRef = eventsRef.child(eventId);
  const state = store.getState();
  const event = state.data.event[0];
  const ticketsTotal = () => (
    Object.keys(event.tickets).map((ticket) => {
      const ticketTotal = (event.tickets[ticket].count * event.tickets[ticket].price);
      return ticketTotal;
    })
  );
  const totalRevenue = ticketsTotal().reduce((a, b) => a + b);
  const getCountTotal = () => (
    Object.keys(event.tickets).map((ticket) => {
      const countTotal = event.tickets[ticket].count;
      return countTotal;
    })
  );
  const totalCount = getCountTotal().reduce((a, b) => a + b);
  eventRef.update({
    totalRevenue,
    totalCount,
  });
}

// Update the cashbox amount
export function updateCash(eventId) {
  const eventRef = eventsRef.child(eventId);
  const event = store.getState().data.event[0];
  const parsedExpenses = [];
  Object.keys(event.expenses).forEach((expense) => {
    parsedExpenses.push({
      ...event.expenses[expense],
    });
  });
  let totalExpenses = 0;
  for (let i = 0; i < parsedExpenses.length; i += 1) {
    totalExpenses += parsedExpenses[i].cost;
  }
  const endingCash = (event.totalRevenue - totalExpenses) + event.cash;
  const net = endingCash - event.cash;

  eventRef.update({
    totalExpenses,
    endingCash,
    net,
  });
}

// Expenses
export function fetchExpenseDetails(eventId, expenseId) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.on('value', (snapshot) => {
    const expense = snapshot.val() || {};
    store.dispatch(actions.fetchExpenseDetails(expense));
  });
}

// Add expense
export function addExpense(id, expense) {
  const eventRef = eventsRef.child(id);
  const expensesRef = eventRef.child('expenses');
  expensesRef.push().set(expense);
}

// Edit expense details given new information
export function editExpenseDetails(eventId, expenseId, expense) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.update(expense);
  store.dispatch(actions.clearExpense());
}

export function removeExpense(id, expenseId) {
  const eventRef = eventsRef.child(id);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.remove();
}

// change the paid status on an expense
export function changeCheckBox(eventId, expenseId, checked) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');

  expensesRef.child(expenseId).update({
    paid: checked,
  });
}


// Function to update event totals when a ticket is modified
// The majority of this code is to calculate the new administrative fee every
// time a new ticket is added or removed.
export function updateExpenses(eventId) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const state = store.getState().data;
  const event = state.event[0];
  const expenses = event.expenses;

  const parsedExpenses = [];
  Object.keys(expenses).forEach((expense) => {
    parsedExpenses.push({
      ...expenses[expense],
      key: expense,
    });
  });

  // Find the band expense
  function findBand(expense) {
    return expense.type === 'Band';
  }
  const bandExpense = parsedExpenses.find(findBand); // band expense
  // Find the venue expense
  function findVenue(expense) {
    return expense.type === 'Venue';
  }
  const venueExpense = parsedExpenses.find(findVenue); // venue expense

  // Make sure the band and the venue both exist
  if (bandExpense !== undefined && venueExpense !== undefined) {
    // define the band and expense keys
    const bandExpenseId = bandExpense.key;
    const venueExpenseId = venueExpense.key;

    let newBandExpense;
    let newVenueExpense;
    let newAdminFee;
    newVenueExpense = (event.totalRevenue * parseInt(venueExpense.percent, 10)) / 100;
    let venueMod = newVenueExpense % 1;
    newBandExpense = (event.totalRevenue * (bandExpense.percent / 100)) + venueMod;
    if (event.totalRevenue > 0) {
      // If the band is making more than the minimum
      if (event.fee <= 100 && newBandExpense > event.band_minimum) {
        if (bandExpense.percent > 0 && venueExpense.percent > 0) {
          let tempCostVenue = (event.totalRevenue * parseInt(venueExpense.percent, 10)) / 100;
          venueMod = tempCostVenue % 1;
          const multiplier = Math.pow(10, 2);
          const result = Math.round(venueMod * multiplier) / multiplier;
          venueMod = result;
          tempCostVenue += venueMod; // set the new venue cost - the mod
          const tempCostBand = (event.totalRevenue * (bandExpense.percent / 100)) + venueMod;
          const r = tempCostBand - event.band_minimum; // $30
          let bandAdmin;
          if (r > bandExpense.percent) {
            bandAdmin = 70;
          } else {
            bandAdmin = r;
          }

          let venueAdmin = Math.floor((bandAdmin / (bandExpense.percent / 100)) - bandAdmin);
          if (venueAdmin > venueExpense.percent) {
            venueAdmin = 30;
          }

          // define variables if there is a percentage on the expense
          newBandExpense = tempCostBand - bandAdmin;
          newVenueExpense = tempCostVenue - venueAdmin;
          newAdminFee = bandAdmin + venueAdmin;
        }
      } else {
        newAdminFee = 0;
        newVenueExpense = (event.totalRevenue * parseInt(venueExpense.percent, 10)) / 100;
        venueMod = newVenueExpense % 1;
        const multiplier = Math.pow(10, 2);
        const result = Math.round(venueMod * multiplier) / multiplier;
        venueMod = result;
        newVenueExpense -= venueMod;
        newBandExpense = (event.totalRevenue * (bandExpense.percent / 100)) + venueMod;
      }
      if (newAdminFee < 0) {
        newAdminFee = 0;
      }
    } else if (event.totalRevenue === 0) {
      newBandExpense = 0;
      newVenueExpense = 0;
      newAdminFee = 0;
    }

    // ***** Set the expenses and event updates in the database and the store
    expensesRef.child(bandExpenseId).update({
      cost: newBandExpense,
    });
    expensesRef.child(venueExpenseId).update({
      cost: newVenueExpense,
    });
    eventRef.update({
      fee: newAdminFee,
    });
  }
}
