import { createStore } from "vuex";
import { auth } from "./auth.module";
import { websocket } from "./websocket.module";

const store = createStore({
    modules: {
        auth,
        websocket,
    },
});

export default store;