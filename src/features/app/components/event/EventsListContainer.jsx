import { connect } from 'react-redux';
import { EventsList } from './EventsList';

const mapStateToProps = state => ({
  events: state.data.events.events,
  loading: state.data.events.loading,
});

export const EventsListContainer = connect(mapStateToProps)(EventsList);
