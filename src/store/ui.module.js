export const ui = {
    namespaced: true,
    state: {
        showSearch: false,
        showChatList: false,
        showFollowedUsers: false,
        showBlockedUsers: false,
        showSettings: false,
        showChat: false,
        searchInput: '',
        foundUsers: [],
        chatUser: {}
    },
    actions: {
        clearSidebar({commit}) {
            commit('clearSidebar');
        },
        clearChat({commit}) {
            commit('clearChat');
        },
        showChatList({commit}) {
            commit('clearSidebar');
            commit('openChatList');
        },
        showFollowedUsers({commit}) {
            commit('clearSidebar');
            commit('openFollowedUsers');
        },
        showSettings({commit}) {
            commit('clearSidebar');
            commit('openSettings');
        },
        showBlockedUsers({commit}) {
            commit('clearSidebar');
            commit('openBlockedUsers');
        },
        showChat({commit}) {
            commit('resetState');
            commit('openChat');
        },
        setFoundUsers: ({commit}, users) => {
            commit('setFoundUsers', users);
        },
        setSearchInput: ({commit}, input) => {
            commit('setSearchInput', input);
        }
    },
    mutations: {
        resetState(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showSettings = false;
            state.showChat = false;
        },
        clearSidebar(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showSettings = false;
            state.searchInput = '';
            state.foundUsers = [];
        },
        clearChat(state) {
            state.showChat = false;
            state.chatUser = {};
        },
        openSettings(state) {
            state.showSettings = true;
        },
        openChatList(state) {
            state.showChatList = true;
        },
        openChat(state) {
            state.showChat = true;
        },
        openFollowedUsers(state) {
            state.showFollowedUsers = true;
        },
        openBlockedUsers(state) {
            state.showBlockedUsers = true;
        },
        setFoundUsers(state, users) {
            state.foundUsers = users;
        },
        setSearchInput(state, input) {
            state.searchInput = input;
        }
    }
}