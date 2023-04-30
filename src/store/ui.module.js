export const ui = {
    namespaced: true,
    state : {
        showSearch: false,
        showChatList: true,
        showFollowedUsers: false,
        showBlockedUsers: false,
        showBlacklist: false,
        showSettings: false,
        showChat: false,
    },
    actions: {
        showSettings({ commit }) {
            commit('openSettings');
        },
        showChatList({ commit }) {
            commit('openChatList');
        },
        showBlacklist({ commit }) {
            commit('openBlacklist');
        },
        clearSideBar({ commit }) {
            commit('clearSideBar');
        },
        showChat({ commit }) {
            commit('openChat');
        },
        showFollowedUsers({ commit }) {
            commit('resetState');
            commit('openFollowedUsers');
        },
        showBlockedUsers({ commit }) {
            commit('openBlockedUsers');
        }
    },
    mutations: {
        resetState(state) {
            Object.keys(state).forEach(key => {
                state[key] = false;
            });
        },
        openSettings(state) {
            this.commit('resetState');
            state.showSettings = true;
        },
        openChatList(state) {
            this.commit('resetState');
            state.showChatList = true;
        },
        openBlacklist(state) {
            this.commit('resetState');
            state.showBlacklist = true;
        },
        clearSideBar(state) {
            this.commit('resetState');
            state.showChat = true;
        },
        openChat(state) {
            this.commit('resetState');
            state.showChat = true;
        },
        openFollowedUsers(state) {
            state.showFollowedUsers = true;
        },
        openBlockedUsers(state) {
            this.commit('resetState');
            state.showBlockedUsers = true;
        }
    }
}