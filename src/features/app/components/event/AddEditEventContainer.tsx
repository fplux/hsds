import { connect } from 'react-redux';
import { AddEditEvent } from './AddEditEvent';

const mapStateToProps = state => ({
  event: state.data.event[0],
  loading: state.data.event.loading,
});

export const AddEditEventContainer = connect(mapStateToProps)(AddEditEvent);
