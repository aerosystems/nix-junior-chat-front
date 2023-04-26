// import TokenService from './services/token.service';
import store from "./store";

const websocket = {
    url: "ws://localhost:80/ws/chat",
    options: {
        store: store,
        format: "json",
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
        connectManually: true, // Підключення вручну
        headers: { // Заголовки запиту
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NVdWlkIjoiYTY2NzcwNzUtMjA1NS00NTFmLTkzYmItMmRhODQ2OGY4ZTdhIiwiZXhwIjoxNjgyNzU2MzA0LCJ1c2VySWQiOjN9.2bEvKMvfwO677awNohAYqBZTsNRqlrDHLd1HcBGzNGE'
        },
        mutations: {
            SOCKET_ONOPEN: 'socketOnOpen',
            SOCKET_ONCLOSE: 'socketOnClose',
            SOCKET_ONERROR: 'socketOnError',
            SOCKET_ONMESSAGE: 'socketOnMessage',
            SOCKET_RECONNECT: 'socketReconnect', // <--- ім'я мутації перепідключення
            SOCKET_RECONNECT_ERROR: 'socketReconnectError'
        },
    },
}
export default websocket;