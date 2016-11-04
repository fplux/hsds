/* Shared function for confirmation of deletion of events */
export function getConfirmation() {
  const retVal = confirm('Are you sure you want to delete this event?'); // eslint-disable-line
  switch (retVal) {
    case true:
      return true;
    default:
      return false;
  }
}
