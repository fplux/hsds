import { connect } from 'react-redux';
import { Nav } from './Nav';

const mapStateToProps = state => ({
  years: state.data.years.years,
  loading: state.data.years.loading,
});

export const NavContainer = connect(mapStateToProps)(Nav);
