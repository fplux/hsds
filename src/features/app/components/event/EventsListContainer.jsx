import { connect } from 'react-redux';
import { EventsList } from './EventsList';

const mapStateToProps = state => ({
  events: state.data.futureEvents.events,
  loading: state.data.futureEvents.loading,
});

export const EventsListContainer = connect(mapStateToProps)(EventsList);
