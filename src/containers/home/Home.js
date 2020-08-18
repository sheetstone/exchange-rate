import React, { useEffect, useState } from 'react'
import { getHistory } from '../../api/exchangeRateData'

const Home = props => {
  const [data, setData] = useState(null)

  useEffect(() => {
    getHistory(
      `history?start_at=2020-07-17&end_at=2020-08-17`
    ).then(res => {
      setData(res)
    })
  }, [])

  console.log(data)

  if (!data) {
    return <h1>Loading...</h1>
  }

  let tableRow = [];
  const dateArray = Object.keys(data.rates);
  const symbolArray = Object.keys(data.rates[dateArray[0]]);
  console.log(dateArray);
  console.log(symbolArray);
  tableRow = symbolArray.map(symbolKey => {
    const tableCell = [];
    tableCell.push(<td>{symbolKey}</td>);
    tableCell.push(dateArray.map(dateKey => {
      return <td>{data.rates[dateKey][symbolKey]}</td>
    }))
    return <tr>{tableCell}</tr>
  })

  return <table border='1'>
    {tableRow}
  </table>
}

export default Home
