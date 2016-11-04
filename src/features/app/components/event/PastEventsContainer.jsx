import { connect } from 'react-redux';
import { PastEvents } from './PastEvents';

const mapStateToProps = state => ({
  events: state.data.events.events,
  loading: state.data.events.loading,
});

export const PastEventsContainer = connect(mapStateToProps)(PastEvents);
