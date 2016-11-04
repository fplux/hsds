import { connect } from 'react-redux';
import { EditEvent } from './EditEvent';

const mapStateToProps = state => ({
  event: state.data.event[0],
  loading: state.data.event.loading,
});

export const EditEventContainer = connect(mapStateToProps)(EditEvent);
