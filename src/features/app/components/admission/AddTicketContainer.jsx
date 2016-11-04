import { connect } from 'react-redux';
import { AddTicket } from './AddTicket';

const mapStateToProps = state => ({
  tickets: state.data.common.tickets,
  loading: state.data.common.loading,
});

export const AddTicketContainer = connect(mapStateToProps)(AddTicket);
