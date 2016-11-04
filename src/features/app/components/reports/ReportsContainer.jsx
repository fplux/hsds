import { connect } from 'react-redux';
import { Reports } from './Reports';

const mapStateToProps = state => ({
  events: state.data.pastEvents.events,
  loading: state.data.pastEvents.loading,
});

export const ReportsContainer = connect(mapStateToProps)(Reports);
