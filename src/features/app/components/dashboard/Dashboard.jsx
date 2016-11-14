import React from 'react';
import { YearlySummary } from './YearlySummary';
import { Metrics } from './Metrics';

const Loading = require('react-loading-animation');

export class Dashboard extends React.Component {
  render() {
    const renderPage = () => {
      if (this.props.loading === undefined || this.props.loading === true) {
        return <Loading />;
      }
      if (this.props.loading === false) {
        return (
          <div>
            <h3 className="text-center page-header">Dashboard</h3>
            <div className="dashboard-container">
              <YearlySummary {...this.props} />
              <Metrics {...this.props} />
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
