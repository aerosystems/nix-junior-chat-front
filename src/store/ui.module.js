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
        }
    },
    mutations: {
        openSettings(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showBlacklist = false;
            state.showSettings = true;
            state.showChat = false;
        },
        openChatList(state) {
            state.showSearch = false;
            state.showChatList = true;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showBlacklist = false;
            state.showSettings = false;
            state.showChat = false;
        },
        openBlacklist(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showBlacklist = true;
            state.showSettings = false;
            state.showChat = false;
        },
        clearSideBar(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showBlacklist = false;
            state.showSettings = false;
            state.showChat = true;
        }
    }
}