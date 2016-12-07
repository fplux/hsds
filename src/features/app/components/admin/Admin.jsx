import React from 'react';
import * as api from '../../../data/api';

const Loading = require('react-loading-animation');

export class Admin extends React.Component {
  constructor() {
    super();
    api.fetchAdminDetails();
  }
  handleChange = (e) => {
    e.preventDefault();
  }
  render() {
    const renderSplits = () => {
      if (this.props.admin.loading === false) {
        const { bandSplit, venueSplit, adminFee, total } = this.props.admin;
        return (
          <div>
            <label htmlFor="band-split">Band</label>
            <input
              type="text"
              id="bandSplit"
              onChange={this.handleChange}
              defaultValue={bandSplit}
            />
            <br />

            <label htmlFor="venue-split">Band</label>
            <input type="text" id="venueSplit" onChange={this.handleChange} defaultValue={venueSplit} />
            <br />

            <label htmlFor="admin-fee">Band</label>
            <input type="text" id="adminFee" onChange={this.handleChange} defaultValue={adminFee} />
            <br />
          </div>
        );
      }
      return (
        <Loading />
      );
    };
    return (
      <div>
        <p className="text-center">Organization Administration page</p>
        <hr />

        <h4>Split</h4>
        {renderSplits()}
      </div>
    );
  }
}

Admin.propTypes = {
  admin: React.PropTypes.shape({
    bandSplit: React.PropTypes.string,
    venueSplit: React.PropTypes.string,
    adminFee: React.PropTypes.string,
    total: React.PropTypes.string,
    loading: React.PropTypes.bool,
  }),
};
