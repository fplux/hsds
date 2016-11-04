import { connect } from 'react-redux';
import { Reports } from './Reports';

const mapStateToProps = state => ({
  events: state.data.events.events,
  loading: state.data.events.loading,
});

export const ReportsContainer = connect(mapStateToProps)(Reports);
