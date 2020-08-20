import React from 'react';

import Chart from 'react-google-charts';

import { connect } from 'react-redux';
import dataToArr from '../../../utils/dataToArr';

const DataChart = props => {
  const { rates, selectedSymbols } = props;
  const chartDataArray = [ ['Exchange Rate', ...selectedSymbols] , ...dataToArr(rates)];
  
  return (
    <>
      <Chart
        chartType='LineChart'
        width='100%'
        height='400px'
        data={chartDataArray}
      />
    </>
  )
}

const mapStateToProps = state => ({
  rates: state.rates,
  selectedSymbols: state.selectedSymbols,
})

export default connect(mapStateToProps)(DataChart)