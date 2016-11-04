import { connect } from 'react-redux';
import { EventDetail } from './EventDetail';

const mapStateToProps = state => ({
  event: state.data.event,
  disabled: state.data.event.disabled,
});

export const EventDetailContainer = connect(mapStateToProps)(EventDetail);
