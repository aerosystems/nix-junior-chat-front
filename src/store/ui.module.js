export const ui = {
    namespaced: true,
    state: {
        showSearch: false,
        showChatList: false,
        showFollowedUsers: false,
        showBlockedUsers: false,
        showSettings: false,
        showChat: false,
        showProfile: false,
        showSecurity: false,
        searchInput: '',
        foundUsers: [],
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
            commit('openChat');
        },
        showProfile({commit}) {
            commit('openProfile');
        },
        showSecurity: ({commit}) => {
            commit('openSecurity');
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
            state.showProfile = false;
            state.showSecurity = false;
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
        },
        openSettings(state) {
            state.showSettings = true;
        },
        openChatList(state) {
            state.showChatList = true;
        },
        openChat(state) {
            state.showProfile = false;
            state.showChat = true;
        },
        openProfile(state) {
            state.showChat = false;
            state.showSecurity = false;
            state.showProfile = true;
        },
        openSecurity(state) {
            state.showChat = false;
            state.showProfile = false;
            state.showSecurity = true;
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