import moment from 'moment';
import firebase, { firebaseRef } from '../../../firebase';
import * as actions from '../data/actions';
import * as helpers from '../data/helpers';
import store from '../../store';

/* Firebase References */

const eventsRef = firebaseRef.child('events');

export function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
    if (err) {

    }
  }).then((success) => {
    if (success) {
      window.location = '#/';
    }
  });
}

// Add Event
export function addEvent(newEvent) {
  eventsRef.push().set(newEvent);
}

export function deleteEvent(eventId) {
  eventsRef.child(eventId).remove();
  helpers.fetchEvents();
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
    const disabled = new Date(parsedEvents[0].date).getTime() < new Date(moment().format('L')).getTime();
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
  updateExpenses(eventId);
  updateCash(eventId);
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
  const expenses = event.expenses;
  const parsedExpenses = [];
  if (expenses) {
    Object.keys(expenses).forEach((expense) => {
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
export function addExpense(eventId, expense) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  expensesRef.push().set(expense);

  updateTotals(eventId);
  updateExpenses(eventId);
  updateCash(eventId);
}

// Edit expense details given new information
export function editExpenseDetails(eventId, expenseId, expense) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.update(expense);
  store.dispatch(actions.clearExpense());

  updateTotals(eventId);
  updateExpenses(eventId);
  updateCash(eventId);
}

export function removeExpense(eventId, expenseId) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.remove();

  store.dispatch(actions.clearExpense());

  updateTotals(eventId);
  updateExpenses(eventId);
  updateCash(eventId);
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

  // Find the band expense
  function findBand(expense) {
    return expense.type === 'Band';
  }

  // Find the venue expense
  function findVenue(expense) {
    return expense.type === 'Venue';
  }
  if (expenses) {
    Object.keys(expenses).forEach((expense) => {
      parsedExpenses.push({
        ...expenses[expense],
        key: expense,
      });
    });

    const bandExpense = parsedExpenses.find(findBand); // band expense
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
              bandAdmin = parseInt(bandExpense.percent, 10);
            } else {
              bandAdmin = r;
            }

            let venueAdmin = Math.floor((bandAdmin / (bandExpense.percent / 100)) - bandAdmin);
            if (venueAdmin > venueExpense.percent) {
              venueAdmin = parseInt(venueExpense.percent, 10);
            }

            // define variables if there is a percentage on the expense
            newBandExpense = Math.round(tempCostBand - bandAdmin);
            newVenueExpense = Math.round(tempCostVenue - venueAdmin);
            newAdminFee = Math.round(bandAdmin + venueAdmin);
          }
        } else {
          newAdminFee = 0;
          newVenueExpense = Math.round((event.totalRevenue * parseInt(venueExpense.percent, 10)) / 100); // eslint-disable-line
          venueMod = newVenueExpense % 1;
          const multiplier = Math.pow(10, 2);
          const result = Math.round(venueMod * multiplier) / multiplier;
          venueMod = result;
          newVenueExpense -= venueMod;
          newBandExpense = Math.round((event.totalRevenue * (bandExpense.percent / 100)));
        }
        if (newAdminFee < 0) {
          newAdminFee = 0;
        }
      } else if (event.totalRevenue === 0) {
        newBandExpense = 0;
        newVenueExpense = 0;
        newAdminFee = 0;
      }

      const expensesTotal = () => (
        Object.keys(event.expenses).map((expense) => {
          const expenseTotal = (event.expenses[expense].cost);
          return expenseTotal;
        })
      );
      const totalExpenses = expensesTotal().reduce((a, b) => a + b);

      // ***** Set the expenses and event updates in the database and the store
      if (newBandExpense) {
        expensesRef.child(bandExpenseId).update({
          cost: newBandExpense,
        });
      }
      if (newVenueExpense) {
        expensesRef.child(venueExpenseId).update({
          cost: newVenueExpense,
        });
      }
      if (newAdminFee) {
        eventRef.update({
          fee: newAdminFee,
          totalExpenses,
        });
      }
    }
  }
}
