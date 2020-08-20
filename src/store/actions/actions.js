/*
* Action type
*/

export const LOAD_EXCHANGE_RATE = 'LOAD_EXCHANGE_RATE';
export const SET_SELECTED_SYMBOLS = 'SET_SELECTED_SYMBOLS';
export const SET_REFRESHING_RATES = 'SET_REFRESHING_RATES';
export const SET_CURRENT_SRC = 'SET_CURRENT_SRC';
export const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";


/*
* Action Creator
*/
export const loadExChangeRate = (obj) => {
  return {
      type: LOAD_EXCHANGE_RATE,
      ...obj
  }
}

export const changeBaseCurrency = (obj) => {
  return {
    type: SET_BASE_CURRENCY,
    ...obj
  }
}

export const changeSelectedSymbol = (obj) => {
  return {
    type: SET_SELECTED_SYMBOLS,
    ...obj
  }
}

export const changeRefreshRate = (obj) => {
  return {
    type: SET_REFRESHING_RATES,
    ...obj
  }
}