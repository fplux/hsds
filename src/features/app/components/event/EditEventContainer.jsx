import { connect } from 'react-redux';
import { EditEvent } from './EditEvent';

const mapStateToProps = state => ({
  event: state.data.event,
});

export const EditEventContainer = connect(mapStateToProps)(EditEvent);
