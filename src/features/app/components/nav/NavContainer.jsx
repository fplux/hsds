import { connect } from 'react-redux';
import { Nav } from './Nav';

const mapStateToProps = state => ({
  years: state.data.years.years,
  loading: state.data.years.loading,
  user: state.data.user,
});

export const NavContainer = connect(mapStateToProps)(Nav);
