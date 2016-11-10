import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Years } from './Years';

export class Nav extends React.Component {
  closeMenu = (e) => {
    console.log(e.currentTarget);
    if (window.innerWidth < 600) {
      document.getElementById('nav-toggle').click();
    }
  };

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
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <IndexLink onClick={this.closeMenu} to="/" className="link" activeClassName="active" activeStyle={activeStyles}>Events</IndexLink>
              </li>
              <li className="nav-divider"> | </li>
              <li>
                <Link onClick={this.closeMenu} to="/new" className="link" activeClassName="active" activeStyle={activeStyles}>Add Event</Link>
              </li>
              <li className="nav-divider"> | </li>
              <li>
                <Link onClick={this.closeMenu} to="/past" className="link" activeClassName="active" activeStyle={activeStyles}>Past Events</Link>
              </li>
              <li className="nav-divider"> | </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Reports <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li>
                    <Link onClick={this.closeMenu} to="/reports" className="link" activeClassName="active" activeStyle={activeStyles}>All Events</Link>
                  </li>
                  {renderYears()}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
