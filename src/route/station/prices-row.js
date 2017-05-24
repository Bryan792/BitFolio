import React from 'react'

import {
  View,
  Text,
  Animated,
} from 'react-native'

import colors from 'material-colors'

export default class extends React.PureComponent {

  state = {
    fadeAnim: new Animated.Value(1)
  }
    /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.price !== this.props.price) {
    Animated.sequence([
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 50,
          useNativeDriver: true, // <-- Add this
        }
      ), Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 50,
          useNativeDriver: true, // <-- Add this
        }
      )]).start()
    }
  }
  */

  render() {
    let {
      short,
      price,
      percChange,
      name,
      index,
      marketCap,
    } = this.props
    let backgroundColor
    if (percChange === 0) {
      backgroundColor = colors.white
    } else {
      let color = percChange < 0 ? colors.red : colors.green
      switch (true) {
        case Math.abs(percChange) < 1:
          degree = 50
          break
        case Math.abs(percChange) < 5:
          degree = 100
          break
        case Math.abs(percChange) < 10:
          degree = 200
          break
        case Math.abs(percChange) < 20:
          degree = 300
          break
        case Math.abs(percChange) < 30:
          degree = 400
          break
        default:
          degree = 500
      }
      backgroundColor = color[degree]
    }
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 56,
          backgroundColor: backgroundColor,
          opacity: this.state.fadeAnim,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
          }}
        >
          <Text>{index}</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>{name}</Text>
          <Text
            style={{
              fontWeight: 'bold',
            }}
          >{short}</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
            }}
          >${marketCap}</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
            }}
          >{percChange}%</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
            }}
          >${price}</Text>
        </View>
      </Animated.View>
    )
  }
}
