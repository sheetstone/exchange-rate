import React from 'react'
import { connect } from 'react-redux'

import * as actCreator from '../../store/actions/actions'
import { Container, Form } from 'react-bootstrap'
import Layout from '../../components/HOC/Layout/Layout'
import CURRENCY_LIST from '../../utils/currenyList'

import classes from './Settings.module.scss'

const Settings = props => {
  const { baseCurrency, selectedSymbols, refreshingRate,
          onChangeBaseCurrency,
          onChangeSelectedSymbol,
          onChangeRefreshRate } = props

  const optionList = []
  for (const [sym, name] of Object.entries(CURRENCY_LIST)) {
    optionList.push(
      <option value={sym} key={sym}>
        {sym} - {name}
      </option>
    )
  }

  const onCheckChange = (e, key) => {
    console.log(key)
    const selSym = [...selectedSymbols];
    const pos = selSym.indexOf(key);
    if(pos === -1){
      selSym.push(key);
    }else{
      selSym.splice(pos,1);
    }
    onChangeSelectedSymbol(selSym);
  }

  const selectionList = []
  for (const [sym, name] of Object.entries(CURRENCY_LIST)) {
    selectionList.push(
      <Form.Check type='checkbox' key={sym} className={classes.symbolItem}>
        <Form.Check.Input
          type='checkbox'
          checked={selectedSymbols.includes(sym)}
          onChange={e => onCheckChange(e, sym)}
          className = {classes.countryInput}
          name='selectedSymbol'
        ></Form.Check.Input>
        <Form.Check.Label
          onClick={e => onCheckChange(e, sym)}
          className={classes.countrylabel}
        >
          <img
            src={`https://www.ecb.europa.eu/shared/img/flags/${sym}.gif`}
            alt={name}
            className={classes.countryFlag}
          />
          {sym} - {name}
        </Form.Check.Label>
      </Form.Check>
    )
  }

  return (
    <Layout>
      <Container>
        <h1>Settings</h1>
        <hr></hr>
        <Form.Group>
          <Form.Label>
            Default(Base) Currency -{' '}
            <img
              src={`https://www.ecb.europa.eu/shared/img/flags/${baseCurrency}.gif`}
              alt={baseCurrency}
            />
            {baseCurrency} - {CURRENCY_LIST[baseCurrency]}
          </Form.Label>
          <Form.Control
            as='select'
            value={baseCurrency}
            onChange={onChangeBaseCurrency}
          >
            {optionList}
          </Form.Control>
        </Form.Group>

        <hr className={classes.hline} />

        <Form.Group className={classes.selectionList}>
          <Form.Label className={classes.selectionHeader}>
            Shows on Homepage
          </Form.Label>
          {selectionList}
        </Form.Group>

        <hr className={classes.hline} />
        <Form.Group>
          <Form.Label>Refresh Frequency(seconds)</Form.Label>
          <Form.Control type='input' value={refreshingRate} onChange={e=>onChangeRefreshRate(e.target.value)}/>
        </Form.Group>
      </Container>
    </Layout>
  )
}

const mapStateToProps = state => ({
  dateRange: state.dateRange,
  selectedSymbols: state.selectedSymbols,
  baseCurrency: state.baseCurrency,
  refreshingRate: state.refreshingRate
})

const mapDispatchToProps = dispatch => {
  return {
    onChangeBaseCurrency: e =>
      dispatch(actCreator.changeBaseCurrency({ baseCurrency: e.target.value })),
    onChangeSelectedSymbol: (seleSymbol) => dispatch(actCreator.changeSelectedSymbol({ selectedSymbols: seleSymbol })),
    onChangeRefreshRate: (refreshRate) => dispatch(actCreator.changeRefreshRate({ refreshingRate: refreshRate }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
