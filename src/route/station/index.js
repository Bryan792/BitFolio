import React from 'react'
import {
  AppState,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import {
  loadPrices,
  startSocket,
  stopSocket,
} from '../../action/prices'
import PricesList from './prices-list'
import PricesHeader from './prices-header'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPrices: () => dispatch(loadPrices()),
    startSocket: () => dispatch(startSocket()),
    stopSocket: () => dispatch(stopSocket()),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Station extends React.PureComponent {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    this.props.loadPrices()
    this.props.startSocket()
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    this.props.stopSocket()
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.loadPrices()
      this.props.startSocket()
    } else if (nextAppState.match(/inactive|background/)) {
      this.props.stopSocket()
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <View>
        <PricesHeader />
        <PricesList />
      </View>
    )
  }
}
