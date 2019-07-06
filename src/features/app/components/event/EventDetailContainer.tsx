import { connect } from 'react-redux';
import { EventDetail } from './EventDetail';

const mapStateToProps = state => ({
  disabled: state.data.event.disabled,
  user: state.data.user,
});

export const EventDetailContainer = connect(mapStateToProps)(EventDetail);
