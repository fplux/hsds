import React from 'react';
import moment from 'moment';
import { YearlySummary } from './YearlySummary';
import { Metrics } from './Metrics';
import { Averages } from './Averages';
import { BalSummary } from './BalSummary';
import { BluesSummary } from './BluesSummary';
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
              <div className="dash-row">
                <YearlySummary year={year} {...this.props} />
                <Metrics {...this.props} />
                <Averages {...this.props} />
              </div>
              <br /> <br />
              <div className="dash-row">
                <BalSummary {...this.props} />
                <BluesSummary {...this.props} />
                <MonthlySummary {...this.props} />
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
