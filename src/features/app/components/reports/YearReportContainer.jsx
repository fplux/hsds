import { connect } from 'react-redux';
import { YearReport } from './YearReport';

const mapStateToProps = state => ({
  events: state.data.pastEvents.events,
  loading: state.data.pastEvents.loading,
});

export const YearReportContainer = connect(mapStateToProps)(YearReport);
