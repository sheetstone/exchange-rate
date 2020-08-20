import * as actionType from '../actions/actions.js'
import moment from 'moment'

const initalState = {
  rates: null,
  dateRange: [
    moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD'),
    moment().format('YYYY-MM-DD')
  ],
  symbols: [],
  baseCurrency: 'EUR',
  selectedSymbols: ['USD', 'JPY', 'CAD', 'CNY'],
  refreshingRate: 10,
  currentSources: 'https://api.exchangeratesapi.io/'
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionType.LOAD_EXCHANGE_RATE:
      return {
        ...state,
        rates: action.rates
      }
    case actionType.SET_SELECTED_SYMBOLS:
      return {
        ...state,
        selectedSymbols: action.selectedSymbols
      }
    case actionType.SET_REFRESHING_RATES:
      return {
        ...state,
        refreshingRate: action.refreshingRate
      }
    case actionType.SET_CURRENT_SRC:
      return {
        ...state,
        currentSources: action.currentSources
      }
    case actionType.SET_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.baseCurrency
      }
    default:
      return state
  }
}

export default reducer
