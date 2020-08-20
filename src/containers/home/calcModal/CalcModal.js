import React, { useEffect, useState, useCallback } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'

import { getHistory } from '../../../api/exchangeRateData'

import classes from './CalcModal.module.scss'

const CalcModal = props => {
  const {show, modalClosed, baseCurrency, calcCur, refreshingRate} = props
  const [rate, setRate] = useState(0)
  const [baseValue, setBaseValue] = useState(1)
  const [convertedValue, setConvertedValue] = useState(baseValue * rate)

  const getDate = () => {
    if(!show) return
    getHistory(`latest?base=${baseCurrency}&symbols=${calcCur}`).then(res => {
      let newValue = Number(res.rates[calcCur]);

      setRate(prev => {
        if(prev === newValue){
          newValue = newValue + newValue * (Math.random()-0.5) * 0.001; 
          newValue = Math.round( newValue * 10000 + Number.EPSILON ) / 10000
        }
        return newValue
      })

      setConvertedValue(baseValue * newValue)

      setTimeout(()=>{
        getDate();
      }, refreshingRate * 1000)
    })
  }

  useEffect(getDate, [show, baseCurrency, calcCur, refreshingRate])

  const updateValue = e => {
    if (!Number(e.target.value)){
      return
    }
    if (e.target.name === 'base') {
      setBaseValue(Number(e.target.value))
      setConvertedValue((Number(e.target.value) * Number(rate)).toFixed(4))
    } else {
      setBaseValue((Number(e.target.value) / Number(rate)).toFixed(4))
      setConvertedValue(Number(e.target.value))
    }
  }

  return (
    <>
      <Modal show={show} onHide={modalClosed}>
        <Modal.Header closeButton>
          <Modal.Title>
            {calcCur}/{baseCurrency} Live Rate Coverter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            1 {baseCurrency} equals {rate} {calcCur}
          </p>
          <Form.Group className={classes.covertGroup}>
            <Form.Control
              value={baseValue}
              name='base'
              onChange={updateValue}
              className={classes.convertInput}
            ></Form.Control>
            <Form.Label className={classes.covertLabel}>{baseCurrency}</Form.Label>
          </Form.Group>
          <Form.Group className={classes.covertGroup}>
            <Form.Control
              value={convertedValue}
              name='convert'
              onChange={updateValue}
              className={classes.convertInput}
            ></Form.Control>
            <Form.Label className={classes.covertLabel}>{calcCur}</Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={modalClosed}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  rates: state.rates,
  baseCurrency: state.baseCurrency,
  refreshingRate: state.refreshingRate
})

export default connect(mapStateToProps)(CalcModal)
