export const ui = {
    namespaced: true,
    state: {
        showSearch: false,
        showChatList: false,
        showFollowedUsers: false,
        showBlockedUsers: false,
        showBlacklist: false,
        showSettings: false,
        showChat: false,
        searchInput: '',
        foundUsers: []

    },
    actions: {
        showSettings({commit}) {
            commit('openSettings');
        },
        showChatList({commit}) {
            commit('openChatList');
        },
        showBlacklist({commit}) {
            commit('openBlacklist');
        },
        clearSideBar({commit}) {
            commit('clearSideBar');
        },
        showChat({commit}) {
            commit('openChat');
        },
        showFollowedUsers({commit}) {
            commit('openFollowedUsers');
        },
        showBlockedUsers({commit}) {
            commit('openBlockedUsers');
        },
        showSearchList: ({commit}) => {
            commit('openSearchList');
        },
    },
    mutations: {
        resetState(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showBlacklist = false;
            state.showSettings = false;
            state.showChat = false;
        },
        clearSideBar(state) {
            this.commit('resetState');
            state.showChat = true;
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
        openChat(state) {
            this.commit('resetState');
            state.showChat = true;
        },
        openFollowedUsers(state) {
            this.commit('resetState');
            state.showFollowedUsers = true;
        },
        openBlockedUsers(state) {
            this.commit('resetState');
            state.showBlockedUsers = true;
        },
        openSearchList(state) {
            this.commit('resetState');
            state.showSearch = true;
        }
    }
}