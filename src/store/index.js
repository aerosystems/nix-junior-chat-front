import { createStore } from "vuex";
import { auth } from "./auth.module";
import { websocket } from "./websocket.module";
import { ui } from "./ui.module";
import { user } from "./user.module";

const store = createStore({
    modules: {
        auth,
        websocket,
        ui,
        user
    },
});

export default store;