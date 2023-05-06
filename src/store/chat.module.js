export const chat = {
    namespaced: true,
    state: {
        messages: [],
        companion: {},
    },
    actions: {
        setCompanion({commit}, companion) {
            commit('setCompanion', companion);
        },
    },
    mutations: {
        setCompanion(state, companion) {
            state.companion = companion;
        }
    }
}