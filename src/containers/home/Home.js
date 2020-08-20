import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actCreator from '../../store/actions/actions'
import { getHistory } from '../../api/exchangeRateData'
import DataTable from './dataTable/DataTable'
import DataChart from './dataChart/DataChart'
import CalcModal from './calcModal/CalcModal'
import Layout from '../../components/HOC/Layout/Layout'

const Home = props => {
  const {
    rates,
    selectedSymbols,
    onLoadExchangeRate,
    dateRange,
    baseCurrency
  } = props
  const [modalShow, setModalShow] = useState(false)
  const [calcCur, setCalcCur] = useState(selectedSymbols[0])

  useEffect(() => {
    const symbolStr = selectedSymbols.join(',')
    const [startDate, endDate] = dateRange
    getHistory(
      `history?start_at=${startDate}&end_at=${endDate}&symbols=${symbolStr}&base=${baseCurrency}`
    ).then(res => {
      onLoadExchangeRate(res.rates)
    })
  }, [])

  if (!rates) {
    return <h1>Loading...</h1>
  }

  const handleModalClose = () => setModalShow(false);
  const handleRowClick = sym => {
    console.log(sym)
    setCalcCur(sym)
    setModalShow(true)
  }

  return (
    <>
      <Layout>
        <DataTable rowClicked={handleRowClick} />
        <DataChart />
        <CalcModal
          show={modalShow}
          modalClosed={handleModalClose}
          calcCur={calcCur}
        />
      </Layout>
    </>
  )
}

const mapStateToProps = state => ({
  rates: state.rates,
  dateRange: state.dateRange,
  selectedSymbols: state.selectedSymbols,
  baseCurrency: state.baseCurrency
})

const mapDispatchToProps = dispatch => {
  return {
    onLoadExchangeRate: rates =>
      dispatch(actCreator.loadExChangeRate({ rates: rates }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
