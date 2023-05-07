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
        clearChat({commit}) {
            commit('clearChat', {});
        },
        pushMessage({commit}, {content, sender, recepiend}) {
            commit('pushMessage', {content, sender, recepiend});
        }
    },
    mutations: {
        setCompanion(state, companion) {
            state.companion = companion;
        },
        clearChat(state) {
            state.messages = [];
            state.companion = {};
        },
        pushMessage(state, {content, sender, recepiend}) {
            state.messages.push({
                content: content,
                sender: sender,
                recepiend: recepiend,
                date: new Date()
            });
        }
    }
}