import React from 'react'
import {
  View,
  Text,
  Button,
} from 'react-native'
import { connect } from 'react-redux'

import {
  sortPressed,
} from '../../action/prices'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortName: () => dispatch(sortPressed('name')),
    sortMarketCap: () => dispatch(sortPressed('marketCap')),
    sortPerc: () => dispatch(sortPressed('perc')),
    sortPrice: () => dispatch(sortPressed('price')),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends React.PureComponent {

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 56,
          borderBottomWidth: 1,
        }}
      >
        <Button
          onPress={this.props.sortName}
          title="Name"
        />
        <Button
          onPress={this.props.sortMarketCap}
          title="Market Cap"
        />
        <Button
          onPress={this.props.sortPerc}
          title="24Hr %"
        />
        <Button
          onPress={this.props.sortPrice}
          title="Price"
        />
      </View>
    )
  }
}
