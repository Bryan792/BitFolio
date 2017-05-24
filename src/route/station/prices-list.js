import React from 'react'
import {
  Text,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'

import PricesRow from './prices-row'

function mapStateToProps(state) {
  return {
    prices: state.prices.get('prices'),
    sort: state.prices.get('sort'),
  }
}

function mapDispatchToProps(dispatch) {
  return { 
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PricesList extends React.PureComponent {

  render() {
    function prettyPrintMarketCap(marketCap) {
      if (marketCap < 1E6) {
        return ~~marketCap || 0
      } else if (marketCap < 1E9) {
        return (marketCap / 1E6).toFixed(1) + 'M'
      } else if (marketCap < 1E12) {
        return (marketCap / 1E9).toFixed(1) + 'B'
      }
    }

    let data = Array.from(this.props.prices.values()).sort((a,b)=>a.position24-b.position24)
    switch (this.props.sort) {
      case 'name':
        data = data.sort((a,b) => a.long - b.long)
        break
      case 'marketCap':
        data = data.sort((a,b) => b.marketCap - a.marketCap)
        break
      case 'perc':
        data = data.sort((a,b) => b.cap24hrChange - a.cap24hrChange)
        break
      case 'price':
        data = data.sort((a,b) => b.price - a.price)
        break
      default:
        break
    }

    return (
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <PricesRow
            index={index}
            name={item.long}
            short={item.short}
            price={item.price > 1 ? parseFloat(item.price).toFixed(2) : parseFloat(item.price).toFixed(6)}
            percChange={item.cap24hrChange}
            marketCap={prettyPrintMarketCap(item.mktcap)}
          />
        )}
        keyExtractor={(item, index) => item.short}
      />
    )
  }
}
