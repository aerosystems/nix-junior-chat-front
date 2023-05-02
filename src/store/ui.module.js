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
        showChatList({commit}) {
            commit('resetState');
            commit('openChatList');
        },
        showFollowedUsers({commit}) {
            commit('resetState');
            commit('openFollowedUsers');
        },
        showSettings({commit}) {
            commit('resetState');
            commit('openSettings');
        },
        showBlockedUsers({commit}) {
            commit('resetState');
            commit('openBlockedUsers');
        },
        showChat({commit}, user) {
            commit('resetState');
            commit('openChat', user);
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
            state.searchInput = '';
            state.foundUsers = [];
        },
        clearSidebar(state) {
            state.showSearch = false;
            state.showChatList = false;
            state.showFollowedUsers = false;
            state.showBlockedUsers = false;
            state.showSettings = false;
            state.showChat = true;
            state.searchInput = '';
            state.foundUsers = [];
        },
        openSettings(state) {
            state.showSettings = true;
        },
        openChatList(state) {
            state.showChatList = true;
        },
        openChat(state, user) {
            state.showChat = true;
            state.chatUser = user;
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