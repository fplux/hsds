import { connect } from 'react-redux';
import { Dashboard } from './Dashboard';

const mapStateToProps = state => ({
  net: state.data.data.net,
  income: state.data.data.income,
  expenses: state.data.data.expenses,
  revper: state.data.data.revper,
  count: state.data.data.count,
  avgEvent: state.data.data.avgEvent,
  avgBandCost: state.data.data.avgBandCost,
  avgVenueCost: state.data.data.avgVenueCost,
  loading: state.data.data.loading,
  pastEvents: state.data.pastEvents.events,
  numEvents: state.data.data.numEvents,
  balData: state.data.data.balData,
  bluesData: state.data.data.bluesData,
  monthlyData: state.data.data.monthlyData,
});

export const DashboardContainer = connect(mapStateToProps)(Dashboard);
