import { connect } from 'react-redux';
import { Admin } from './Admin';

const mapStateToProps = state => ({
  admin: state.data.admin,
});

export const AdminContainer = connect(mapStateToProps)(Admin);
