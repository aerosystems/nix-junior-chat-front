export const websocket = {
    state: {
        socket: {
            // Connection Status
            isConnected: false,
            // Message content
            message: "",
            // Reconnect error
            reconnectError: false,
        }
    },
    mutations: {
        socketOnOpen(state, event) {
            state.socket.isConnected = true;
            console.log('Socket opened!', event)
        },
        socketOnClose(state, event) {
            console.log('Socket closed!', event)
        },
        socketOnError(state, event) {
            this.commit('ui/showModal', {title: 'Error connecting', message: 'Attempting to reconnect...'}, {root: true});
            console.error('Socket error!', event)
        },
        socketOnMessage(state, message) {
            state.socket.message = message;
            console.log('Socket message:', message)
        },
        socketReconnect(state, count) {
            console.log('Socket reconnected!', count)
        },
        socketReconnectError(state, event) {
            this.commit('ui/showModal', {title: 'Error connecting', message: 'Lost connection to server. Try to refresh the page.'}, {root: true});
            state.socket.reconnectError = true;
            console.log('Socket reconnection error!', event)
        }
    }
}
