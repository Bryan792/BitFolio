import Immutable from 'immutable'

import {
  LOAD_PRICES_SUCCESS,
  RECEIVE_SOCKET_PRICE,
  SORT_PRESSED,
} from '../action/prices'

const initialState = Immutable.fromJS({
  prices: {},
})

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRICES_SUCCESS: {
      let returnState = state
      action.payload.forEach(coin => {
        returnState = returnState.setIn(['prices' , coin.short], coin)
      })
      return returnState
    }
    case RECEIVE_SOCKET_PRICE: {
      let returnState = state
      action.payload.forEach(message => {
        returnState = returnState.setIn(['prices' , message.message.coin], message.message.msg)
      })
      return returnState
    }
    case SORT_PRESSED:
      return state.set('sort', action.payload)
    default:
      return state
  }
}
