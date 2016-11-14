import React from 'react';
import moment from 'moment';
import { YearlySummary } from './YearlySummary';
import { Metrics } from './Metrics';
import { Averages } from './Averages';
import { HbnSummary } from './HbnSummary';
import { MonthlySummary } from './MonthlySummary';

const Loading = require('react-loading-animation');

export class Dashboard extends React.Component {
  render() {
    const year = moment().format('L').split('/')[2];
    const renderPage = () => {
      if (this.props.loading === undefined || this.props.loading === true) {
        return <Loading />;
      }
      if (this.props.loading === false) {
        return (
          <div>
            <h3 className="text-center page-header">Dashboard</h3>
            <div className="dashboard-container">
              <div className="row">
                <div className="col-md-4">
                  <YearlySummary year={year} {...this.props} />
                </div>
                <div className="col-md-4">
                  <Metrics {...this.props} />
                </div>
                <div className="col-md-4">
                  <Averages {...this.props} />
                </div>
              </div>
              <br /> <br />
              <div className="row">
                <div className="col-md-6">
                  <HbnSummary {...this.props} />
                </div>
                <div className="col-md-6">
                  <MonthlySummary {...this.props} />
                </div>
              </div>
            </div>
          </div>
        );
      }
      return true;
    };
    return (
      <div>
        {renderPage()}
      </div>
    );
  }
}

Dashboard.propTypes = {
  loading: React.PropTypes.bool,
};
