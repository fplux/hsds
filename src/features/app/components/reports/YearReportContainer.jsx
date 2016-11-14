import { connect } from 'react-redux';
import { YearReport } from './YearReport';

const mapStateToProps = state => ({
  loading: state.data.yearEvents.loading,
  events: state.data.yearEvents.events,
});

export const YearReportContainer = connect(mapStateToProps)(YearReport);
