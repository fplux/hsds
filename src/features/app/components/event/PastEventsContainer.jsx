import { connect } from 'react-redux';
import { PastEvents } from './PastEvents';

const mapStateToProps = state => ({
  events: state.data.pastEvents.events,
  loading: state.data.pastEvents.loading,
});

export const PastEventsContainer = connect(mapStateToProps)(PastEvents);
