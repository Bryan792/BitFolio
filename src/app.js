import React from 'react'
import { StackNavigator } from 'react-navigation'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import StationScreen from './route/station'
import prices from './reducer/prices'
console.warn = () => {}
console.ignoredYellowBox = ['Setting a timer', 'Warning: BackAndroid']

let store = createStore(combineReducers({
  prices,
}), applyMiddleware(thunk))

let App = StackNavigator({
  Home: {
    screen: StationScreen
  }
})

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
