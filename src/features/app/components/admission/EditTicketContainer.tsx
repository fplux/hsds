import { connect } from 'react-redux';
import { EditTicket } from './EditTicket';

const mapStateToProps = state => ({
  ticket: state.data.ticket,
  loading: state.data.ticket.loading,
});

export const EditTicketContainer = connect(mapStateToProps)(EditTicket);
