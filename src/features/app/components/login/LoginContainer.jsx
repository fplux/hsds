import { connect } from 'react-redux';
import { Login } from './Login';

const mapStateToProps = state => ({
  error: state.data.user.error,
});

export const LoginContainer = connect(mapStateToProps)(Login);
