import React from 'react';
import { Link, IndexLink } from 'react-router';
import firebase from '../../../../../firebase';
import { Years } from './Years';
import * as actions from '../../../data/actions';
import store from '../../../../store';

export class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      userStatus: '',
    };
  }

  closeMenu = () => {
    if (window.innerWidth < 600) {
      document.getElementById('nav-toggle').click();
    }
  };

  logout = () => {
    store.dispatch(actions.logout());
    firebase.auth().signOut();
  }

  render() {
    const activeStyles = {
      backgroundColor: '#455B8A',
      color: 'white',
    };
    const renderYears = () => {
      if (this.props.loading === false) {
        const { years } = this.props;
        return Object.keys(years).map((year) => {
          const yearInfo = years[year];
          return (
            <Years key={year} year={yearInfo} closeMenu={this.closeMenu} />
          );
        });
      }
      return true;
    };

    const adminNav = () => (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li>
            <IndexLink onClick={this.closeMenu} to="/" className="link" activeClassName="active" activeStyle={activeStyles}>Overview</IndexLink>
          </li>
          <li className="nav-divider"> | </li>
          <li>
            <Link onClick={this.closeMenu} to="/events" className="link" activeClassName="active" activeStyle={activeStyles}>Events</Link>
          </li>
          <li className="nav-divider"> | </li>
          <li>
            <Link onClick={this.closeMenu} to="/new" className="link" activeClassName="active" activeStyle={activeStyles}>Add Event</Link>
          </li>
          <li className="nav-divider"> | </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Reports <span className="caret" /></a>
            <ul className="dropdown-menu">
              <li>
                <Link onClick={this.closeMenu} to="/reports" className="link" activeClassName="active" activeStyle={activeStyles}>All Events</Link>
              </li>
              {renderYears()}
            </ul>
          </li>
        </ul>
        <ul className={`${this.props.user.userStatus} nav navbar-nav navbar-right`}>
          <li>
            <IndexLink onClick={this.logout} to="/" className="link" activeClassName="active" activeStyle={activeStyles}>Logout</IndexLink>
          </li>
        </ul>
      </div>
    );

    const userNav = () => (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li>
            <Link onClick={this.closeMenu} to="/events" className="link" activeClassName="active" activeStyle={activeStyles}>Events</Link>
          </li>
        </ul>
        <ul className={`${this.props.user.userStatus} nav navbar-nav navbar-right`}>
          <li>
            <IndexLink onClick={this.logout} to="/" className="link" activeClassName="active" activeStyle={activeStyles}>Logout</IndexLink>
          </li>
        </ul>
      </div>
    );

    const noUserNav = () => (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" />
    );

    const navigation = () => {
      if (this.props.user.role === 'admin') {
        return adminNav();
      } else if (this.props.user.role === 'user') {
        return userNav();
      }
      return noUserNav();
    };
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" id="nav-toggle" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <li className="navbar-brand nav-title" href="#">HSDS</li>
          </div>
          {navigation()}
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  loading: React.PropTypes.bool,
  years: React.PropTypes.array,// eslint-disable-line
  user: React.PropTypes.user,
};
