import { connect } from 'react-redux';
import { Admin } from './Admin';

const mapStateToProps = state => ({
  admin: state.data.admin,
  events: state.data.events.events,
  common: state.data.common.common,
});

export const AdminContainer = connect(mapStateToProps)(Admin);
