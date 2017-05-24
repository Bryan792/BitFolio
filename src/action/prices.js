import { createAction } from 'redux-actions'
import io from 'socket.io-client'

export const LOAD_PRICES = 'LOAD_PRICES'

export const LOAD_PRICES_SUCCESS = 'LOAD_PRICES_SUCCESS'
export const loadPricesSuccess = createAction(LOAD_PRICES_SUCCESS)

export const RECEIVE_SOCKET_PRICE = 'RECEIVE_SOCKET_PRICE'
export const receiveSocketPrice = createAction(RECEIVE_SOCKET_PRICE)

export const SORT_PRESSED = 'SORT_PRESSED'
export const sortPressed = createAction(SORT_PRESSED)


export const loadPrices = () => (dispatch, getState) => {
  fetch('http://coincap.io/front')
    .then(response => response.json())
    .then(response => dispatch(loadPricesSuccess(response)))
}

let socket = io.connect('http://socket.coincap.io', {
  transports: ['websocket'], // you need to explicitly tell it to use websockets
})

export const startSocket = () => (dispatch, getState) => {
  socket.open()

  let queue = []
  socket.on('trades', function(tradeMsg) {
    queue.push(tradeMsg)
  })

  setInterval(() => {
    if (queue.length > 0) {
      //      dispatch(receiveSocketPrice(queue))
      queue.length = 0
    }
  }, 5000)

  socket.on('global', function(globalMsg) {
  })
}

export const stopSocket = () => (dispatch, getState) => {
  socket.close()
}
