/* Shared function for confirmation of deletion of events */
export function confirmDeleteEvent() {
  const retVal = confirm('Are you sure you want to delete this event?'); // eslint-disable-line
  switch (retVal) {
    case true:
      return true;
    default:
      return false;
  }
}

/* Shared function for confirmation of deletion of tickets */
export function confirmDeleteTicket() {
  const retVal = confirm('Are you sure you want to delete this ticket?'); // eslint-disable-line
  switch (retVal) {
    case true:
      return true;
    default:
      return false;
  }
}

/* Shared function for confirmation of deletion of expense */
export function confirmDeleteExpense() {
  const retVal = confirm('Are you sure you want to delete this expense?'); // eslint-disable-line
  switch (retVal) {
    case true:
      return true;
    default:
      return false;
  }
}
