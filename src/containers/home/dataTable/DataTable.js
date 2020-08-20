import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classes from './DataTable.module.scss';

const DataTable = props => {
  const { rates, selectedSymbols, rowClicked } = props;


  const dateArray = Object.keys(rates).sort((a,b)=>{
    return moment(a) - moment(b)
  });

  const theadRow = [<th key='head'>CUR</th>, ...dateArray.map(date=>{
    return (<th key={date}>{date}</th>)
  })];

  const tableRow = selectedSymbols.map(symbolKey => {
    const tableCell = []
    tableCell.push(<td key='head'>{symbolKey}</td>)
    tableCell.push(
      dateArray.map(dateKey => {
        return <td key={dateKey}>{Number(rates[dateKey][symbolKey]).toFixed(2)}</td>
      })
    )
    return <tr key={symbolKey} onClick={()=>rowClicked(symbolKey)}>{tableCell}</tr>
  })

  return (
    <>
      <table border='1' className={classes.ExchangeTable}>
        <thead><tr>{theadRow}</tr></thead>
        <tbody>{tableRow}</tbody>
      </table>
    </>
  )
}

const mapStateToProps = state => ({
  rates: state.rates,
  selectedSymbols: state.selectedSymbols,
})


export default connect(mapStateToProps)(DataTable)
