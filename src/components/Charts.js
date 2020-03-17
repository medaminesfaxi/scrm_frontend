import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';

// core components
import { chartOptions, parseOptions, chart } from './vars.js';

class Charts extends React.Component {
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <div className="chart__container">
        <div className="chart">
          <Line
            data={this.props.data}
            options={chart.options}
            getDatasetAtEvent={e => console.log(e)}
          />
        </div>
      </div>
    );
  }
}

export default Charts;
