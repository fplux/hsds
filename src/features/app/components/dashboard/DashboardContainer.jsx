import { connect } from 'react-redux';
import { Dashboard } from './Dashboard';

const mapStateToProps = state => ({
  net: state.data.data.net,
  income: state.data.data.income,
  expenses: state.data.data.expenses,
  revper: state.data.data.revper,
  count: state.data.data.count,
  avgEvent: state.data.data.avgEvent,
  loading: state.data.data.loading,
  pastEvents: state.data.pastEvents.events,
});

export const DashboardContainer = connect(mapStateToProps)(Dashboard);
