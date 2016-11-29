import React from 'react';
import * as api from '../../../data/api';

export class Login extends React.Component {
  login() {
    const email = this.email.value;
    const password = this.password.value;
    api.login(email, password);
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="text-center">HSDS Login</h1>
          <input className="form-control" type="text" ref={(ref) => { this.email = ref; }} />
          <input className="form-control" type="password" ref={(ref) => { this.password = ref; }} />
          <br />
          <button className="custom-login-btn btn btn-primary" onClick={() => this.login()}>Login</button>
          <br />
          <p className="login-error">{this.props.error}</p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  error: React.PropTypes.string,
};
