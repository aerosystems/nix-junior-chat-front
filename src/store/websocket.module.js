export const websocket = {
  state: {
    socket: null
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket
    },
    socketOnOpen(state, event) {
      console.log('Socket opened!', event)
    },
    socketOnClose(state, event) {
      console.log('Socket closed!', event)
    },
    socketOnError(state, event) {
      console.error('Socket error!', event)
    },
    socketOnMessage(state, message) {
      console.log('Socket message:', message)
    },
    socketReconnect(state, count) { // <--- мутація перепідключення
      console.log('Socket reconnected!', count)
    }
  }
}
