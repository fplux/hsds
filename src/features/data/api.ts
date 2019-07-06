import * as moment from 'moment';
import * as _ from 'lodash';
import firebase, { firebaseRef } from '../../../firebase';
import * as actions from '../data/actions';
import * as helpers from '../data/helpers';
import store from '../../store';
import { IExpense, IEvent } from '../../interfaces';

/* Firebase References */

const eventsRef = firebaseRef.child('events');

export function login(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
    if (err) {
      store.dispatch(actions.loginerror());
    }
  }).then((success) => {
    if (success) {
      helpers.getUserPermissions(success['uid']);
      const user = {
        id: success['uid'],
      };
      store.dispatch(actions.setUser(user));
      window.location.href = '#/';
    }
  });
}

// Add Event
export function addEvent(newEvent) {
  eventsRef.push().set(newEvent);
}

export function deleteEvent(eventId) {
  // copy the event and move to deleted
  eventsRef.child(eventId).once('value').then((snapshot) => {
    firebaseRef.child('backups').child(eventId).set(snapshot.val());
    eventsRef.child(eventId).remove();
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
    const disabled = new Date(parsedEvents[0].date).getTime() < new Date(moment().format('L')).getTime();
    store.dispatch(actions.fetchEventDetails(parsedEvents, disabled));
  });
}

// stop listening to updates for this event
export function unsubscribeToEvent(id) {
  eventsRef.orderByKey().equalTo(id).off('value');
  //store.dispatch(actions.clearEvent());
}

export function subscribeToEvent(id: string, callback: (event: IEvent) => void) {
  eventsRef.child(id).on('value', snapshot => {
    callback(snapshot.val());
  });
}

export function editEventDetails(id, eventDetails) {
  const eventRef = eventsRef.child(id);
  eventRef.update(eventDetails);
  updateExpenses(id);
  updateCash(id);
}

export function getConfig() {
  firebaseRef.child('config').on('value', (snapshot) => {
    const config = snapshot.val();
    store.dispatch(actions.fetchConfig(config));
  });
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

export function fetchAdminDetails() {
  firebaseRef.child('admin').child('split').on('value', (snapshot) => {
    const adminInfo = snapshot.val() || '';
    store.dispatch(actions.setAdminDetails(adminInfo));
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
  }).then(() => {
    updateTotals(eventId).then(() => {
      updateExpenses(eventId).then(() => {
        updateCash(eventId); 
      });
    });
  });

  
}

const updateTotals = (eventId) => new Promise((resolve, reject) => {
  const eventRef = eventsRef.child(eventId);

  eventRef.once('value').then(snapshot => { 
    const event = snapshot.val();;
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
    }).then(() => {
      resolve();
    });

  });
});

// Update the cashbox amount
export function updateCash(eventId) {
  const eventRef = eventsRef.child(eventId);

  eventRef.once('value').then(snapshot => {
    const event = snapshot.val();
    const expenses = event.expenses;
    let totalExpenses;
    let net;
    let endingCash;
    if (expenses) {
      totalExpenses = helpers.getTotalEventExpenses(expenses);
      endingCash = Math.floor((event.totalRevenue - totalExpenses) + parseInt(event.cash, 10));
      net = endingCash - parseInt(event.cash, 10);
    } else {
      totalExpenses = 0;
      endingCash = parseInt(event.cash, 10);
      net = endingCash;
    }
    eventRef.update({
      totalExpenses,
      endingCash,
      net,
    });
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
export function addExpense(eventId, expense) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  expensesRef.push().set(expense);

  updateTotals(eventId).then(() => {
    updateExpenses(eventId).then(() => {
      updateCash(eventId); 
    });
  });
}

// Edit expense details given new information
export function editExpenseDetails(eventId, expenseId, expense) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.update(expense);
  store.dispatch(actions.clearExpense());

  updateTotals(eventId).then(() => {
    updateExpenses(eventId).then(() => {
      updateCash(eventId); 
    });
  });
}

export function removeExpense(eventId, expenseId) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');
  const expenseRef = expensesRef.child(expenseId);
  expenseRef.remove();

  store.dispatch(actions.clearExpense());

  updateTotals(eventId).then(() => {
    updateExpenses(eventId).then(() => {
      updateCash(eventId); 
    });
  });
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

// Find the band expense
function findBand(expense) {
  return expense.type === 'Band';
}

// Find the venue expense
function findVenue(expense) {
  return expense.type === 'Venue';
}

/* Get the expenses from firebase and return them */
export function getEvent() {
  const state = store.getState().data;
  const event = state.event[0];
  return event;
}

/* parse the expenses in order to search for bands and venues */
export function parseExpenses(expenses) {
  const parsedExpenses = [];
  if (expenses) {
    Object.keys(expenses).forEach((expense) => {
      parsedExpenses.push({
        ...expenses[expense],
        key: expense,
      });
    });
  }
  return parsedExpenses;
}

/* This function is executed each time a ticket is added.  This function does several things.
 * First */
export const updateExpenses = (eventId: string) => new Promise((resolve, reject) => {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');

  eventRef.once('value').then(snapshot => {
    const event = snapshot.val();

    const filterFunction = (obj, predicate) =>
    Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => (res[key] = obj[key], res), {});

    let splitExpenses: { [eventId: string]: IExpense };
    let flatExpenses: { [eventId: string]: IExpense };

    let expenses: { [eventId: string]: IExpense } = {};

    if (event.expenses) {
      splitExpenses = filterFunction(event.expenses, e => e.type === 'Split');
      flatExpenses = filterFunction(event.expenses, e => e.type === 'Flat' )
    }

    let flatExpenseAmount =  0;

    if (flatExpenses) {
      // add up all the flat expenses
      _.forEach(flatExpenses, (expense, index) => {
        flatExpenseAmount += expense.cost;
      });
    }

    // What's left to be split after the fixed expenses, this is before any admin fee is applied, but an admin fee
    // could just manually be added here
    const remainingAmount = event.totalRevenue - flatExpenseAmount;

    if (splitExpenses) {
      // if we have split expenses we need to divvy up this amount and then figure out the admin fee
      let newExpense;

      _.forEach(splitExpenses, (expense, index) => {
          // We don't have enough money to start taking the admin fee
          newExpense = (remainingAmount * expense.percent) / 100;
          if (newExpense < 0) {
            newExpense = 0;
          }
          expensesRef.child(index).update({
            cost: newExpense,
          });
      });
    }
    resolve();
  });
});

export function removeAdminFee(eventId) {
  updateTotals(eventId).then(() => {
    updateExpenses(eventId).then(() => {
      updateCash(eventId); 
    });
  });
}

export function finalizeEventDetailsWithFee(eventId, adminFee) {
  const eventRef = eventsRef.child(eventId);
  const expensesRef = eventRef.child('expenses');

  eventRef.once('value').then(snapshot => {
    const event = snapshot.val();

    let splitExpenses: { [eventId: string]: IExpense } = helpers.getSplitExpenses(event.expenses);

    // What's left to be split after the fixed expenses, this is before any admin fee is applied, but an admin fee
    // could just manually be added here
    const remainingAmount = event.totalRevenue - adminFee;

    if (splitExpenses) {
      // if we have split expenses we need to divvy up this amount and then figure out the admin fee
      let newExpense;

      _.forEach(splitExpenses, (expense, index) => {
          
          newExpense = (remainingAmount * expense.percent) / 100;
          if (newExpense < 0) {
            newExpense = 0;
          }
          expensesRef.child(index).update({
            cost: newExpense,
          });
      });
    }

    updateCash(eventId); // finally update our net, ending amounts
  });
}
